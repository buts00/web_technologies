from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.routes import auth_router
from src.expense.route import expenses_router
from src.user.route import user_router

app = FastAPI(title='Expenses Tracker')


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix='/auth')
app.include_router(user_router, prefix='/users')
app.include_router(expenses_router, prefix='/expense')

