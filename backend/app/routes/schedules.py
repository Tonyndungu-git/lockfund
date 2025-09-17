from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, services, models
from ..database import get_db
from ..security import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.schedule.Schedule)
def create_schedule(
    schedule: schemas.schedule.ScheduleCreate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Create a new scheduled fund lock for LockFund. Include validation for amount, start date, release schedule (daily, weekly, monthly), and user balance.
    """
    # Placeholder for user balance check
    # if current_user.balance.amount < schedule.target_amount:
    #     raise HTTPException(status_code=400, detail="Insufficient balance")
    return services.schedule_service.create_schedule(db=db, schedule=schedule, user_id=current_user.id)

@router.get("/", response_model=List[schemas.schedule.Schedule])
def read_schedules(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Retrieve all schedules for the current user.
    """
    schedules = services.schedule_service.get_schedules_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return schedules

@router.get("/{schedule_id}", response_model=schemas.schedule.Schedule)
def read_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Retrieve a specific schedule by ID.
    """
    db_schedule = services.schedule_service.get_schedule_by_id(db, schedule_id=schedule_id, user_id=current_user.id)
    if db_schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return db_schedule

@router.put("/{schedule_id}", response_model=schemas.schedule.Schedule)
def update_schedule(
    schedule_id: int,
    schedule: schemas.schedule.ScheduleUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Update an existing schedule.
    """
    db_schedule = services.schedule_service.update_schedule(db, schedule_id=schedule_id, schedule=schedule, user_id=current_user.id)
    if db_schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return db_schedule

@router.delete("/{schedule_id}", response_model=schemas.schedule.Schedule)
def delete_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Delete a schedule.
    """
    db_schedule = services.schedule_service.delete_schedule(db, schedule_id=schedule_id, user_id=current_user.id)
    if db_schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return db_schedule
