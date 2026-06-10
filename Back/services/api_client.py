"""Client HTTP pour les APIs de football."""
import requests
from typing import Dict, Any, Optional


def fetch_data(url: str, token: Optional[str] = None, token_header: str = 'X-Auth-Token') -> Dict[str, Any]:
    """
    Récupère les données depuis une API.

    Args:
        url: URL de l'API
        token: Token d'authentification
        token_header: Nom du header pour le token

    Returns:
        Dictionnaire JSON de la réponse

    Raises:
        requests.HTTPError: En cas d'erreur HTTP
    """
    headers = {token_header: token} if token else {}
    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()
    return response.json()


def extract_data_list(data: Dict[str, Any]) -> list:
    """
    Extrait la liste de données principale d'une réponse API.

    Args:
        data: Dictionnaire de réponse API

    Returns:
        Liste de données extraite
    """
    if isinstance(data, list):
        return data

    if isinstance(data, dict):
        list_keys = [k for k, v in data.items() if isinstance(v, list)]
        if list_keys:
            return data[list_keys[0]]
        return [data]

    return []


def extract_metadata(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Extrait les métadonnées d'une réponse API.

    Args:
        data: Dictionnaire de réponse API

    Returns:
        Dictionnaire de métadonnées
    """
    if not isinstance(data, dict):
        return {}

    return {k: v for k, v in data.items() if not isinstance(v, (list, dict))}
