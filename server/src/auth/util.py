import uuid
from datetime import timedelta, datetime

import jwt
from fastapi import Header, HTTPException
from passlib.context import CryptContext


from src.auth.config import ACCESS_TOKEN_EXPIRE_SECONDS, SECRET_KEY, ALGORITHM
from src.auth.exception import missing_access_token, invalid_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_token(user_data: dict, expiry: timedelta = None):
    if expiry is None:
        expiry = timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)

    expiration = datetime.utcnow() + expiry
    payload = {
        'user': user_data,
        'exp': expiration,
        'jti': str(uuid.uuid4())
    }
    return jwt.encode(payload=payload, key=SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        decoded_token = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=[ALGORITHM])
        return {'status': 'valid', 'data': decoded_token}
    except jwt.ExpiredSignatureError:
        decoded_token = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=[ALGORITHM], options={"verify_exp": False})
        return {'status': 'expired', 'data': decoded_token}
    except jwt.InvalidTokenError:
        return {'status': 'invalid', 'data': None}


from fastapi import Header, HTTPException, Depends


async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing access token")

    try:
        token_type, access_token = authorization.split()
        if token_type.lower() != 'bearer':
            raise HTTPException(status_code=401, detail="Invalid token type")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    payload_access = decode_token(access_token)

    if payload_access['status'] == 'valid':
        return payload_access['data']['user']

    if payload_access['status'] == 'invalid':
        raise HTTPException(status_code=401, detail="Invalid access token")

    if payload_access['status'] == 'expired':
        raise HTTPException(status_code=401, detail="Access token has expired")

