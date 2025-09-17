from sqlalchemy.orm import Session
from .. import models, schemas

def get_schedule_by_id(db: Session, schedule_id: int, user_id: int):
    return db.query(models.schedule.Schedule).filter(models.schedule.Schedule.id == schedule_id, models.schedule.Schedule.user_id == user_id).first()

def get_schedules_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.schedule.Schedule).filter(models.schedule.Schedule.user_id == user_id).offset(skip).limit(limit).all()

def create_schedule(db: Session, schedule: schemas.schedule.ScheduleCreate, user_id: int):
    db_schedule = models.schedule.Schedule(**schedule.dict(), user_id=user_id)
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def update_schedule(db: Session, schedule_id: int, schedule: schemas.schedule.ScheduleUpdate, user_id: int):
    db_schedule = get_schedule_by_id(db, schedule_id, user_id)
    if not db_schedule:
        return None
    update_data = schedule.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_schedule, key, value)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, schedule_id: int, user_id: int):
    db_schedule = get_schedule_by_id(db, schedule_id, user_id)
    if not db_schedule:
        return None
    db.delete(db_schedule)
    db.commit()
    return db_schedule
