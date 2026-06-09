"""Point d'entrée principal de l'application FastAPI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import router
from api.auth import router as auth_router
from config import settings
from middleware.security import SecurityHeadersMiddleware, OriginValidationMiddleware

app = FastAPI(
    title='Predict Sport API',
    description='API Backend-for-Backend pour récupérer les données de football',
    version='1.0.0',
    docs_url='/docs' if settings.ENVIRONMENT == 'development' else None,
    redoc_url='/redoc' if settings.ENVIRONMENT == 'development' else None,
)

# Middleware de sécurité (ordre important: du plus externe au plus interne)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(OriginValidationMiddleware)

# Configuration CORS sécurisée
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=settings.CORS_METHODS,
    allow_headers=settings.CORS_HEADERS,
)

# Routes
app.include_router(auth_router)
app.include_router(router)


@app.get('/')
async def root():
    """Endpoint de santé."""
    return {
        'status': 'ok',
        'message': 'Predict Sport API',
        'environment': settings.ENVIRONMENT,
        'cors_enabled': True
    }


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)
