"""Endpoints d'authentification."""
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from services.auth_service import create_access_token, verify_api_key

router = APIRouter(prefix='/api/v1/auth', tags=['Authentication'])


class TokenResponse(BaseModel):
    """Réponse contenant le token."""
    access_token: str
    token_type: str = 'bearer'
    expires_in: int


class TokenRequest(BaseModel):
    """Requête pour obtenir un token."""
    api_key: str


@router.post('/token', response_model=TokenResponse)
async def get_token(request: TokenRequest):
    """
    Génère un JWT token en échange d'une API key.

    Args:
        request: Contient l'API key

    Returns:
        JWT token

    Raises:
        HTTPException: Si API key invalide
    """
    if not verify_api_key(request.api_key):
        raise HTTPException(
            status_code=401,
            detail='Invalid API key'
        )

    from config import settings
    token = create_access_token(data={'sub': 'api_client'})

    return TokenResponse(
        access_token=token,
        token_type='bearer',
        expires_in=settings.JWT_EXPIRATION_MINUTES * 60
    )


@router.post('/token-header', response_model=TokenResponse)
async def get_token_from_header(x_api_key: str = Header(...)):
    """
    Génère un JWT token en échange d'une API key via header.

    Args:
        x_api_key: API key dans le header

    Returns:
        JWT token

    Raises:
        HTTPException: Si API key invalide
    """
    if not verify_api_key(x_api_key):
        raise HTTPException(
            status_code=401,
            detail='Invalid API key'
        )

    from config import settings
    token = create_access_token(data={'sub': 'api_client'})

    return TokenResponse(
        access_token=token,
        token_type='bearer',
        expires_in=settings.JWT_EXPIRATION_MINUTES * 60
    )
