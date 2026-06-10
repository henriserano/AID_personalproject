"""Middleware de sécurité pour l'API."""
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from config import settings


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Ajoute des headers de sécurité à toutes les réponses."""

    async def dispatch(self, request: Request, call_next):
        """Traite la requête et ajoute les headers de sécurité."""
        response = await call_next(request)

        # Headers de sécurité
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'

        # En production, masquer la version du serveur
        if settings.ENVIRONMENT == 'production':
            response.headers.pop('server', None)

        return response


class OriginValidationMiddleware(BaseHTTPMiddleware):
    """Valide que les requêtes proviennent d'origines autorisées."""

    async def dispatch(self, request: Request, call_next):
        """Valide l'origine de la requête."""
        origin = request.headers.get('origin')

        # Permettre les requêtes sans origin (appels directs, Postman, etc.)
        if not origin:
            return await call_next(request)

        # En production, valider strictement l'origine
        if settings.ENVIRONMENT == 'production':
            allowed_origins = settings.cors_origins
            if origin not in allowed_origins:
                raise HTTPException(
                    status_code=403,
                    detail='Origin not allowed'
                )

        return await call_next(request)
