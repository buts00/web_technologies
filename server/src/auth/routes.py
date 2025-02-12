from fastapi import APIRouter, Depends, Response, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.exception import user_not_found_by_username
from src.auth.util import create_token, verify_password, get_current_user
from src.api.database import get_session
from src.user.route import user_service
from src.user.schema import UserCreate, UserLogin, UserRead

auth_router = APIRouter()



@auth_router.post("/create-user", response_model=str, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate,response: Response, session: AsyncSession = Depends(get_session)):
    new_user = await user_service.create_user(user, session)
    token = create_token({"user_id": str(new_user.id)})
    response.headers["Authorization"] = f"Bearer {token}"

    return token

@auth_router.post("/login", response_model=str, status_code=status.HTTP_200_OK)
async def login(user: UserLogin, response: Response, session: AsyncSession = Depends(get_session)):
    db_user = await user_service.get_user_by_username(user.username, session)
    if not db_user or not verify_password(user.password, db_user.password):
        raise user_not_found_by_username

    token = create_token({"user_id": str(db_user.id)})
    response.headers["Authorization"] = f"Bearer {token}"
    return token



@auth_router.get("/me", response_model=str, status_code=status.HTTP_200_OK)
async def read_me(current_user: dict = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    db_user = await user_service.get_user_by_id(current_user['user_id'], session)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return str(db_user.id)


