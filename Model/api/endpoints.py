"""Endpoints de l'API."""
from fastapi import APIRouter, HTTPException, Depends
from services.football_service import get_teams_from_football_data, get_leagues_from_api_sports
from schemas import APIResponse
from api.dependencies import get_current_user

router = APIRouter(prefix='/api/v1', tags=['Football Data'])


@router.get('/teams', response_model=APIResponse)
async def get_teams(current_user: dict = Depends(get_current_user)):
    """
    Récupère la liste des équipes depuis football-data.org.

    Requiert un JWT token valide.
    """
    try:
        result = get_teams_from_football_data()
        return APIResponse.from_service(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Erreur lors de la récupération des équipes: {str(e)}')


@router.get('/leagues', response_model=APIResponse)
async def get_leagues(current_user: dict = Depends(get_current_user)):
    """
    Récupère la liste des ligues depuis api-sports.io.

    Requiert un JWT token valide.
    """
    try:
        result = get_leagues_from_api_sports()
        return APIResponse.from_service(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Erreur lors de la récupération des ligues: {str(e)}')
