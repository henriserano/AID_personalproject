"""Service pour récupérer les données de football."""
from typing import Dict, Any
from config import settings
from services.api_client import fetch_data, extract_data_list, extract_metadata


def get_teams_from_football_data() -> Dict[str, Any]:
    """Récupère les équipes depuis football-data.org."""
    url = f'{settings.FOOTBALL_DATA_BASE_URL}/teams'
    raw_data = fetch_data(url, settings.API_KEY_FOOT, settings.FOOTBALL_DATA_TOKEN_HEADER)

    return {
        'data': extract_data_list(raw_data),
        'metadata': extract_metadata(raw_data)
    }


def get_leagues_from_api_sports() -> Dict[str, Any]:
    """Récupère les ligues depuis api-sports.io."""
    url = f'{settings.API_SPORTS_BASE_URL}/leagues'
    raw_data = fetch_data(url, settings.API_KEY_FOOT2, settings.API_SPORTS_TOKEN_HEADER)

    return {
        'data': extract_data_list(raw_data),
        'metadata': extract_metadata(raw_data)
    }
