"""Script de test rapide pour l'API."""
import requests
import json

BASE_URL = 'http://localhost:8000'


def test_health():
    """Test de l'endpoint de santé."""
    response = requests.get(f'{BASE_URL}/')
    print('✅ Health check:', response.json())


def test_teams():
    """Test de l'endpoint teams."""
    response = requests.get(f'{BASE_URL}/api/v1/teams')
    data = response.json()
    print(f'\n✅ Teams - Count: {data["count"]}')
    if data['data']:
        print(f'   Premier résultat: {data["data"][0].get("name", "N/A")}')


def test_leagues():
    """Test de l'endpoint leagues."""
    response = requests.get(f'{BASE_URL}/api/v1/leagues')
    data = response.json()
    print(f'\n✅ Leagues - Count: {data["count"]}')
    print(f'   Metadata: {data["metadata"]}')


if __name__ == '__main__':
    print('🚀 Test de l\'API...\n')
    print('⚠️  Assurez-vous que le serveur est lancé: python -m Model.main\n')

    try:
        test_health()
        test_teams()
        test_leagues()
        print('\n✨ Tous les tests sont passés!')
    except requests.exceptions.ConnectionError:
        print('❌ Erreur: Serveur non accessible. Lancez: python -m Model.main')
    except Exception as e:
        print(f'❌ Erreur: {e}')
