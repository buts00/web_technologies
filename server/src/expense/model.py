import uuid
from sqlalchemy import Column, String, TIMESTAMP, func, Boolean, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from src.api.database import Base

class Expense(Base):
    __tablename__ = 'expense'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.uuid_generate_v4())
    category = Column(String(50), nullable=False)
    name = Column(String(100), nullable=False)
    transaction = Column(Boolean, nullable=False)
    date = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)

    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    user = relationship("User")
