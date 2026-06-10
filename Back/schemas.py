"""Schémas de données pour les réponses API."""
from typing import List, Dict, Any
from pydantic import BaseModel


class APIResponse(BaseModel):
    """Réponse API standardisée."""

    data: List[Dict[str, Any]]
    metadata: Dict[str, Any]
    count: int

    @classmethod
    def from_service(cls, service_response: Dict[str, Any]) -> 'APIResponse':
        """Crée une réponse depuis les données du service."""
        data = service_response.get('data', [])
        metadata = service_response.get('metadata', {})

        return cls(
            data=data,
            metadata=metadata,
            count=len(data)
        )
