from fastapi import FastAPI
from .database import engine, Base
from .routes import users, schedules
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LockFund API",
    description="API for LockFund, a savings and fund-locking application.",
    version="0.1.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(schedules.router, prefix="/schedules", tags=["schedules"])

@app.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to the LockFund API"}
