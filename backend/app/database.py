
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Use DATABASE_URL from environment, but fall back to a local SQLite database for convenience.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./lockfund.db")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # connect_args is needed only for SQLite to allow multithreading
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
