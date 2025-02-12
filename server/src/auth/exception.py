from fastapi import HTTPException, status

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate credentials',
)

forbidden_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You do not have permission to access this resource.',
)

user_already_exists = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail='User with this username already exists'
)

invalid_data = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='Invalid email or password'
)


missing_access_token = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Access token missing"
)

invalid_access_token = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid  access token"
)

expired_access_token = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="expired  access token"
)

user_not_found_by_username = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="user with such username doesn't exists"
)

passwords_do_not_match = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="passwords_do_not_match"
)