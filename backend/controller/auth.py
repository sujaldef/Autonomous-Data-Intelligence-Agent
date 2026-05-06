"""Authentication routes for signup, login, and current-user access."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from engine.orchestrator import build_session_context
from model.db_models import User
from model.schemas import AuthResponse, CurrentUserResponse, LoginRequest, SignupRequest, UserRead
from utils.auth import authenticate_user, create_access_token, get_current_user_dependency, get_user_by_email, hash_password
from utils.db import get_db


router = APIRouter(prefix="/api/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)) -> AuthResponse:
    if get_user_by_email(db, payload.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")

    user = User(
        name=payload.name.strip(),
        email=payload.email.strip().lower(),
        hashed_password=hash_password(payload.password),
        is_active=True,
        role="user",
    )
    db.add(user)
    db.flush()
    token = create_access_token(subject=str(user.id), claims={"email": user.email, "role": user.role})
    return AuthResponse(access_token=token, user=UserRead.model_validate(user))


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(subject=str(user.id), claims={"email": user.email, "role": user.role})
    return AuthResponse(access_token=token, user=UserRead.model_validate(user))


@router.get("/me", response_model=CurrentUserResponse)
def me(current_user: User = Depends(_current_user_dep)) -> CurrentUserResponse:
    return CurrentUserResponse(user=UserRead.model_validate(current_user))
