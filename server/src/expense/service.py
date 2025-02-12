from typing import Sequence, Tuple, Optional
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from src.api.exception import create_db_error_exception
from src.expense.model import Expense
from src.expense.schema import ExpenseCreate, ExpenseUpdate, ExpenseFilter


class ExpenseService:
    async def create_expense(self, expense: ExpenseCreate, user_id: str, session: AsyncSession) -> Expense:
        try:
            new_expense = Expense(**expense.model_dump(), user_id=user_id)
            session.add(new_expense)
            await session.commit()
            await session.refresh(new_expense)
            return new_expense
        except SQLAlchemyError as e:
            raise create_db_error_exception("expense", "create", e)

    async def get_expenses(self, page: int, size: int, expense_filter: ExpenseFilter, session: AsyncSession) -> (
            Sequence[Expense], int):
        try:
            offset = page * size
            filtered_query = expense_filter.filter(
                select(Expense).where(expense_filter.user_id == Expense.user_id)).order_by(Expense.created_at)

            total_count_query = filtered_query.with_only_columns(func.count(Expense.id)).order_by(None)
            total_count = await session.scalar(total_count_query)

            paginated_query = filtered_query.offset(offset).limit(size)
            expenses = (await session.execute(paginated_query)).scalars().all()

            return expenses, total_count
        except SQLAlchemyError as e:
            raise create_db_error_exception("expense", "fetch_all", e)

    async def get_expense_by_id(self, expense_id: str, user_id: UUID, session: AsyncSession) -> Expense:
        try:
            result = await session.execute(select(Expense).where(expense_id == Expense.id , user_id ==  Expense.user_id))
            expense = result.scalars().first()
            return expense
        except SQLAlchemyError as e:
            raise create_db_error_exception("expense", "fetch_id", e)

    async def update_expense(self, expense_id: str, expense_update_data: ExpenseUpdate, user_id: UUID, session: AsyncSession) -> Expense:
        try:
            expense_to_update = await self.get_expense_by_id(expense_id, user_id, session)
            if expense_to_update is None:
                raise HTTPException(status_code=404, detail="Expense not found or access denied")
            update_data_dict = expense_update_data.model_dump()
            for k, v in update_data_dict.items():
                if v is not None:
                    setattr(expense_to_update, k, v)
            await session.commit()
            return expense_to_update
        except SQLAlchemyError as e:
            raise create_db_error_exception("expense", "update", e)

    async def delete_expense(self, expense_id: str, user_id: UUID, session: AsyncSession) -> Expense:
        try:
            expense_to_delete = await self.get_expense_by_id(expense_id, user_id, session)
            if expense_to_delete is None:
                raise HTTPException(status_code=404, detail="Expense not found or access denied")
            await session.delete(expense_to_delete)
            await session.commit()
            return expense_to_delete
        except SQLAlchemyError as e:
            raise create_db_error_exception("expense", "delete", e)
