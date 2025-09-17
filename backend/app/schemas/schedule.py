from pydantic import BaseModel
from typing import Optional
import datetime
from ..models.schedule import ScheduleFrequency

class ScheduleBase(BaseModel):
    goal_name: str
    target_amount: float
    release_date: datetime.datetime
    frequency: ScheduleFrequency

class ScheduleCreate(ScheduleBase):
    pass

class ScheduleUpdate(BaseModel):
    goal_name: Optional[str] = None
    target_amount: Optional[float] = None
    release_date: Optional[datetime.datetime] = None
    frequency: Optional[ScheduleFrequency] = None
    is_active: Optional[int] = None

class Schedule(ScheduleBase):
    id: int
    user_id: int
    locked_amount: float
    start_date: datetime.datetime
    is_active: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True

class TransactionBase(BaseModel):
    amount: float
    transaction_type: str

class TransactionCreate(TransactionBase):
    schedule_id: Optional[int] = None

class Transaction(TransactionBase):
    id: int
    user_id: int
    schedule_id: Optional[int] = None
    timestamp: datetime.datetime

    class Config:
        orm_mode = True
