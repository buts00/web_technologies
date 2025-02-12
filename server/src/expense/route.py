from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.api.database import get_session
from src.auth.util import get_current_user
from src.expense.schema import ExpenseCreate, ExpenseUpdate, ExpenseFilter, ExpenseRead
from src.expense.service import ExpenseService

expenses_router = APIRouter()
expense_service = ExpenseService()


@expenses_router.post("/", response_model=ExpenseRead)
async def create_expense(
        expense: ExpenseCreate,
        session: AsyncSession = Depends(get_session),
        current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    return await expense_service.create_expense(expense, user_id, session)


@expenses_router.get("/", response_model=tuple[list[ExpenseRead], int])
async def get_expenses(
        page: int = 0,
        size: int = 10,
        expense_filter: ExpenseFilter = Depends(),
        session: AsyncSession = Depends(get_session),
        current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get('user_id')
    expense_filter.user_id = user_id
    return await expense_service.get_expenses(page, size, expense_filter, session)


@expenses_router.get("/{expense_id}", response_model=ExpenseRead)
async def get_expense(
        expense_id: str,
        session: AsyncSession = Depends(get_session),
        current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    expense = await expense_service.get_expense_by_id(expense_id, user_id, session)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or access denied")
    return expense


@expenses_router.put("/{expense_id}", response_model=ExpenseRead)
async def update_expense(
        expense_id: str,
        expense_update: ExpenseUpdate,
        session: AsyncSession = Depends(get_session),
        current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    expense = await expense_service.update_expense(expense_id, expense_update, user_id, session)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or access denied")
    return expense


@expenses_router.delete("/{expense_id}", response_model=ExpenseRead)
async def delete_expense(
        expense_id: str,
        session: AsyncSession = Depends(get_session),
        current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    expense = await expense_service.delete_expense(expense_id, user_id, session)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or access denied")
    return expense
