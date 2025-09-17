from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from ..database import Base
import datetime
import enum

class ScheduleFrequency(str, enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"

class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    goal_name = Column(String, index=True)
    target_amount = Column(Float, nullable=False)
    locked_amount = Column(Float, default=0.0)
    start_date = Column(DateTime, default=datetime.datetime.utcnow)
    release_date = Column(DateTime, nullable=False)
    frequency = Column(SQLAlchemyEnum(ScheduleFrequency), nullable=False)
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="schedules")
    transactions = relationship("Transaction", back_populates="schedule")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    schedule_id = Column(Integer, ForeignKey("schedules.id"), nullable=True)
    amount = Column(Float, nullable=False)
    transaction_type = Column(String, index=True) # e.g., 'lock', 'release', 'deposit'
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="transactions")
    schedule = relationship("Schedule", back_populates="transactions")
