"""Authentication router for signing up, logging in, and profiling user details."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from model.schemas import SignupRequest, LoginRequest, AuthResponse, CurrentUserResponse, UserRead
from backend.engine.db_models import User
from utils.db import get_db
from utils.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    """User account creation endpoint."""
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        name=payload.name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role="user",
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token(subject=new_user.id)
    return AuthResponse(
        access_token=token,
        user=UserRead.model_validate(new_user)
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """User login session initiation endpoint."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    token = create_access_token(subject=user.id)
    return AuthResponse(
        access_token=token,
        user=UserRead.model_validate(user)
    )


@router.get("/me", response_model=CurrentUserResponse)
def me(current_user: User = Depends(get_current_user)):
    """Retrieve logged-in user profile details."""
    return CurrentUserResponse(
        user=UserRead.model_validate(current_user)
    )
