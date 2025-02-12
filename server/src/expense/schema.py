from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime, date
from decimal import Decimal
from fastapi_filter.contrib.sqlalchemy import Filter

from src.expense.model import Expense


class ExpenseBase(BaseModel):
    category: str = Field(..., max_length=50)
    name: str = Field(..., max_length=100)
    transaction: bool
    amount: Decimal = Field(..., gt=0)

    class Config:
        orm_mode = True


class ExpenseCreate(ExpenseBase):
    date: Optional[datetime] = None


class ExpenseRead(ExpenseBase):
    id: UUID
    date: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ExpenseUpdate(BaseModel):
    category: Optional[str] = Field(None, max_length=50)
    name: Optional[str] = Field(None, max_length=100)
    transaction: Optional[bool] = None
    amount: Optional[Decimal] = Field(None, gt=0)
    date: Optional[datetime] = None


    class Config:
        orm_mode = True


class ExpenseFilter(Filter):
    category__ilike: Optional[str] = Field(default=None, alias="category")
    name__ilike: Optional[str] = Field(default=None, alias="name")
    transaction: Optional[bool] = None
    date__gte: Optional[date] = Field(default=None, alias="date_gte")
    date__lte: Optional[date] = Field(default=None, alias="date_lte")
    amount__gte: Optional[float] = Field(default=None, alias="amount_gte")
    amount__lte: Optional[float] = Field(default=None, alias="amount_lte")
    user_id: Optional[UUID] = Field(default=None)


    class Constants(Filter.Constants):
        model = Expense

    class Config:
        populate_by_name = True
