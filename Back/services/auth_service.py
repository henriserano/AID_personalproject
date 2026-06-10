"""Service d'authentification JWT."""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from config import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Crée un JWT token.

    Args:
        data: Données à encoder dans le token
        expires_delta: Durée de validité

    Returns:
        Token JWT encodé
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)

    to_encode.update({'exp': expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """
    Vérifie et décode un JWT token.

    Args:
        token: Token JWT à vérifier

    Returns:
        Payload du token si valide, None sinon
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None


def verify_api_key(api_key: str) -> bool:
    """
    Vérifie une API key.

    Args:
        api_key: API key à vérifier

    Returns:
        True si valide
    """
    return api_key == settings.API_AUTH_KEY
