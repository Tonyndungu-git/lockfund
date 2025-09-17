from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from ..database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    schedules = relationship("Schedule", back_populates="owner")
    transactions = relationship("Transaction", back_populates="owner")
    balance = relationship("Balance", uselist=False, back_populates="user")

class Balance(Base):
    __tablename__ = "balances"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, default=0.0)

    user = relationship("User", back_populates="balance")
