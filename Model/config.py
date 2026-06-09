"""Configuration centralisée pour l'application."""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Paramètres de configuration."""

    # API Keys
    API_KEY_FOOT: str = os.getenv('API_KEY_FOOT', '')
    API_KEY_FOOT2: str = os.getenv('FOOT2', '')

    # External APIs
    FOOTBALL_DATA_BASE_URL: str = 'https://api.football-data.org/v4'
    API_SPORTS_BASE_URL: str = 'https://v3.football.api-sports.io'

    FOOTBALL_DATA_TOKEN_HEADER: str = 'X-Auth-Token'
    API_SPORTS_TOKEN_HEADER: str = 'x-apisports-key'

    # JWT Configuration
    JWT_SECRET_KEY: str = os.getenv('JWT_SECRET_KEY', 'dev-secret-key-change-in-production')
    JWT_ALGORITHM: str = 'HS256'
    JWT_EXPIRATION_MINUTES: int = int(os.getenv('JWT_EXPIRATION_MINUTES', '60'))

    # API Key for authentication (for simplicity)
    API_AUTH_KEY: str = os.getenv('API_AUTH_KEY', 'la cle magique de DTS')

    # CORS Configuration
    ENVIRONMENT: str = os.getenv('ENVIRONMENT', 'development')

    @property
    def cors_origins(self) -> list[str]:
        """Retourne les origines autorisées selon l'environnement."""
        if self.ENVIRONMENT == 'production':
            # En production, spécifier les domaines autorisés
            return [
                os.getenv('FRONTEND_URL', 'https://predict-sport.vercel.app'),
                os.getenv('FRONTEND_URL_CUSTOM', ''),
            ]
        # En développement, autoriser localhost sur différents ports
        return [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
        ]

    # Méthodes HTTP autorisées
    CORS_METHODS: list[str] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

    # Headers autorisés
    CORS_HEADERS: list[str] = [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
    ]


settings = Settings()
