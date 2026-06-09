"""Dépendances FastAPI pour l'authentification."""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from services.auth_service import verify_token

security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Vérifie le JWT token et retourne les données de l'utilisateur.

    Args:
        credentials: Credentials Bearer du header Authorization

    Returns:
        Payload du token

    Raises:
        HTTPException: Si token invalide ou expiré
    """
    token = credentials.credentials
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    return payload
