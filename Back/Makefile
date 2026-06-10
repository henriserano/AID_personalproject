# Makefile pour le backend FastAPI

.PHONY: help install dev build up down logs test clean

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances
	pip install -r requirements.txt

dev: ## Lance le serveur en mode développement
	uvicorn main:app --reload --host 0.0.0.0 --port 8000

build: ## Build l'image Docker
	docker build -t predict-sport-backend .

up: ## Démarre les containers
	docker-compose up -d

down: ## Arrête les containers
	docker-compose down

logs: ## Affiche les logs
	docker-compose logs -f backend

restart: down up ## Redémarre les containers

rebuild: ## Rebuild et redémarre
	docker-compose up -d --build

test: ## Teste l'API
	@curl -s http://localhost:8000/ | grep -q "ok" && echo "✅ API OK" || echo "❌ API non accessible"

ps: ## Affiche les containers en cours
	docker-compose ps

shell: ## Accède au shell du container
	docker-compose exec backend sh

clean: ## Nettoie les containers et images
	docker-compose down -v
	docker rmi predict-sport-backend || true

lint: ## Vérifie le code avec ruff
	ruff check .

format: ## Formate le code
	ruff format .

validate: ## Valide la configuration
	@echo "✅ Vérification de la structure..."
	@python -c "from main import app; print('✅ main.py OK')"
	@python -c "from config import settings; print('✅ config.py OK')"
	@python -c "from api.endpoints import router; print('✅ endpoints.py OK')"
	@echo "✅ Tous les modules sont valides"
