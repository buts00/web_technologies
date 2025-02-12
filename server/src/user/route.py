from fastapi import APIRouter, Depends, HTTPException, status, Header, Response
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.database import get_session
from src.auth.util import get_current_user, create_token, verify_password
from src.user.exception import user_not_found_by_id, user_not_found_by_username

from src.user.schema import UserCreate, UserUpdate, UserRead, UserLogin
from src.user.service import UserService
from fastapi import APIRouter, Depends, HTTPException, status, Response

user_router = APIRouter()
user_service = UserService()




@user_router.get("/", response_model=UserRead)
async def get_user(session: AsyncSession = Depends(get_session), current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("user_id")
    user = await user_service.get_user_by_id(user_id, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@user_router.put("/", response_model=UserRead)
async def update_user(user_update: UserUpdate, session: AsyncSession = Depends(get_session), current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("user_id")

    return await user_service.update_user(user_id, user_update, session)

@user_router.delete("/", response_model=UserRead)
async def delete_user(session: AsyncSession = Depends(get_session), current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("user_id")  # отримати user_id з даних користувача
    return await user_service.delete_user(user_id, session)


