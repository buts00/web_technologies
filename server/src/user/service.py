
from sqlalchemy import select, update
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from src.auth.exception import user_already_exists, user_not_found_by_username
from src.api.exception import create_db_error_exception
from src.user.exception import user_not_found_by_id
from src.user.model import User
from src.user.schema import UserCreate, UserUpdate
from src.auth.util import get_password_hash


class UserService:
    async def create_user(self, user: UserCreate, session: AsyncSession) -> User:
        try:
            if await self.user_exists(user.username, session):
                raise user_already_exists

            hashed_password = get_password_hash(user.password)
            new_user = User(
                username=user.username,
                password=hashed_password,
            )
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "create", e)

    async def get_users(self, session: AsyncSession, page: int, size: int) -> Sequence[User]:
        try:
            offset = page * size
            query = select(User).order_by(User.created_at).offset(offset).limit(size)
            result = await session.execute(query)
            return result.scalars().all()

        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "fetch_all", e)

    async def get_user_by_id(self, user_id: str, session: AsyncSession) -> User:
        try:
            result = await session.execute(select(User).where(user_id == User.id))
            user = result.scalars().first()
            if not user:
                raise user_not_found_by_id
            return user
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "fetch_id", e)

    async def update_user(self, user_id: str, user_update_data: UserUpdate, session: AsyncSession) -> User:
        try:
            update_data_dict = {k: v if k != "password" else get_password_hash(v)
                                for k, v in user_update_data.model_dump().items()
                                if v not in [None, ""]}

            stmt = (
                update(User)
                .where(user_id == User.id )
                .values(**update_data_dict)
                .execution_options(synchronize_session="fetch")
            )

            await session.execute(stmt)
            await session.commit()

            user = await self.get_user_by_id(user_id, session)
            return user
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "update", e)

    async def delete_user(self, user_id: str, session: AsyncSession) -> User:
        try:
            user_to_delete = await self.get_user_by_id(user_id, session)
            await session.delete(user_to_delete)
            await session.commit()
            return user_to_delete
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "delete", e)

    async def user_exists(self, username: str, session: AsyncSession) -> bool:
        try:
            result = await session.execute(select(User).where(username == User.username))
            return result.scalars().first() is not None
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "check_existence", e)

    async def get_user_by_username(self, username: str, session: AsyncSession) -> User:
        try:
            query = select(User).where(username == User.username)
            result = await session.execute(query)
            user = result.scalars().first()
            if not user:
                raise user_not_found_by_username
            return user
        except SQLAlchemyError as e:
            raise create_db_error_exception("user", "fetch_username", e)