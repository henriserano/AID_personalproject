# 🏈 Backend FastAPI - Predict Sport

Backend-for-Backend avec authentification JWT pour récupérer les données de football.

## 📦 Structure

```
Model/
├── main.py                 # FastAPI app + middlewares
├── config.py              # Configuration (CORS, APIs, JWT)
├── schemas.py             # Modèles Pydantic
├── api/
│   ├── auth.py           # 🔐 Endpoints JWT
│   ├── endpoints.py      # Routes /teams et /leagues
│   └── dependencies.py   # 🔐 Middleware JWT
├── services/
│   ├── auth_service.py   # 🔐 Logique JWT
│   ├── api_client.py     # Client HTTP
│   └── football_service.py # Logique métier
├── middleware/
│   └── security.py       # Sécurité
├── Dockerfile            # Docker (21 lignes)
├── docker-compose.yml    # Orchestration
├── requirements.txt      # Dépendances (8 packages)
├── Makefile             # Commandes
├── README.md            # Ce fichier
└── JWT_GUIDE.md         # 🔐 Guide JWT complet
```

**350+ lignes Python | JWT Authentication ✅**

---

## 🚀 Quick Start

### 1. Configuration

```bash
cp ../.env.example .env
nano .env
```

```env
ENVIRONMENT=development
API_KEY_FOOT=your_key
FOOT2=your_key

# 🔐 JWT
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_EXPIRATION_MINUTES=60
API_AUTH_KEY=your-secret-api-key-for-jwt
```

### 2. Installation

```bash
pip install -r requirements.txt
```

### 3. Lancement

**Python local (dev)**

```bash
uvicorn main:app --reload
# ou: make dev
```

**Docker (prod)**

```bash
docker-compose up -d
# ou: make up
```

---

## 🔐 Authentification JWT

### Obtenir un token (oui c'est la vrai clé lol)

```bash
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"api_key": "la cle magique de DTS"}'
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### Utiliser le token

```bash
# Obtenir le token
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"api_key":"la cle magique de DTS"}' \
  | jq -r '.access_token')

# Utiliser le token pour accéder aux données
curl http://localhost:8000/api/v1/teams \
  -H "Authorization: Bearer $TOKEN"
```

📖 **Guide complet:** Voir `JWT_GUIDE.md`

---

## 📡 Endpoints

### Authentification (pas de JWT requis)

#### POST /api/v1/auth/token

Obtenir un JWT token avec API key dans le body

**Request:**

```json
{"api_key": "la cle magique de DTS"}
```

**Response:**

```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### POST /api/v1/auth/token-header

Obtenir un JWT token avec API key dans le header

**Request:**

```bash
curl -X POST http://localhost:8000/api/v1/auth/token-header \
  -H "X-API-Key: "la cle magique de DTS"
```

### Données (🔐 JWT requis)

#### GET /api/v1/teams

Équipes depuis football-data.org

**Request:**

```bash
curl http://localhost:8000/api/v1/teams \
  -H "Authorization: Bearer <TOKEN>"
```

**Response:**

```json
{
  "data": [...],
  "metadata": {"count": 50},
  "count": 50
}
```

#### GET /api/v1/leagues

Ligues depuis api-sports.io

**Response:**

```json
{
  "data": [...],
  "metadata": {"results": 1229},
  "count": 1229
}
```

---

## 🔒 Sécurité

### Authentification JWT

- ✅ Token JWT requis pour tous les endpoints `/api/v1/teams` et `/api/v1/leagues`
- ✅ Token expiré après 60 minutes (configurable)
- ✅ Signature HMAC SHA256
- ✅ API key pour obtenir le JWT (pas exposée publiquement)

### CORS par environnement

**Development**

- Origines: `localhost:3000`, `localhost:3001`
- Swagger: ✅ Activé

**Production**

- Origines: Uniquement `FRONTEND_URL`
- Swagger: ❌ Désactivé
- JWT obligatoire

### Middlewares (3 couches)

1. **SecurityHeadersMiddleware** - Headers (XSS, Clickjacking, HSTS)
2. **OriginValidationMiddleware** - Valide origines (prod)
3. **CORSMiddleware** - CORS policy

---

## 🐳 Docker

### Dockerfile (21 lignes)

```dockerfile
FROM python:3.13-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 8000
CMD ["gunicorn", "main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### Commandes

```bash
docker-compose up -d         # Démarrer
docker-compose logs -f       # Logs
docker-compose down          # Arrêter
```

---

## 🛠️ Makefile

```bash
make dev       # Développement (hot reload)
make up        # Docker start
make logs      # Logs en temps réel
make test      # Teste l'API
make validate  # Valide la config
```

---

## 📚 Intégration Next.js

### Service API avec JWT

```typescript
// lib/api/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_AUTH_KEY;

export async function getJWTToken(): Promise<string> {
  const response = await fetch(`${API_URL}/api/v1/auth/token`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ api_key: API_KEY }),
  });
  const data = await response.json();
  return data.access_token;
}

export async function fetchWithAuth(url: string, options = {}) {
  let token = localStorage.getItem('jwt_token');
  
  if (!token) {
    token = await getJWTToken();
    localStorage.setItem('jwt_token', token);
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // Token expiré? Obtenir un nouveau
  if (response.status === 401) {
    token = await getJWTToken();
    localStorage.setItem('jwt_token', token);
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  return response;
}
```

### Service football

```typescript
// lib/api/football.ts
import { fetchWithAuth } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTeams() {
  const response = await fetchWithAuth(`${API_URL}/api/v1/teams`);
  return response.json();
}
```

### .env.local (Frontend)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_AUTH_KEY=your-secret-api-key-for-jwt
```

---

## 🧪 Tests

### Test JWT complet

```bash
./test_jwt.sh
```

### Tests manuels

**1. Sans token (doit échouer)**

```bash
curl http://localhost:8000/api/v1/teams
# → 403 Forbidden
```

**2. Avec token (doit fonctionner)**

```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"api_key": "your-secret-api-key-for-jwt"}' \
  | jq -r '.access_token')

curl http://localhost:8000/api/v1/teams \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐛 Debug

### Module 'jose' not found

```bash
pip install 'python-jose[cryptography]==3.3.0' 'passlib[bcrypt]==1.7.4'
```

### Invalid API key

```bash
python -c "from config import settings; print(settings.API_AUTH_KEY)"
```

### Invalid or expired token

- Token expiré (> 60 min)
- Solution: Obtenir un nouveau token

---

## 📊 Dépendances

```txt
fastapi==0.115.12              # Framework
uvicorn[standard]==0.34.1      # ASGI server
gunicorn==23.0.0               # Production
pydantic==2.10.6               # Validation
requests==2.32.3               # HTTP client
python-dotenv==1.0.1           # Config
python-jose[cryptography]==3.3.0  # 🔐 JWT
passlib[bcrypt]==1.7.4         # 🔐 Hashing
```

**8 dépendances | JWT ✅**

---

## 🚢 Déploiement Production

### .env Production

```env
ENVIRONMENT=production
API_KEY_FOOT=prod_key
FOOT2=prod_key
FRONTEND_URL=https://predict-sport.vercel.app

# 🔐 JWT (CHANGER CES VALEURS!)
JWT_SECRET_KEY=<généré avec: openssl rand -hex 32>
JWT_EXPIRATION_MINUTES=60
API_AUTH_KEY=<clé unique sécurisée>
```

### Générer des secrets sécurisés

```bash
# JWT Secret
openssl rand -hex 32

# API Key
openssl rand -hex 24
```

### Lancer en production

```bash
docker-compose up -d
docker-compose logs backend
```

---

## 💡 Tips

**Sécurité:**

- ✅ Change `JWT_SECRET_KEY` en production (32+ chars)
- ✅ Change `API_AUTH_KEY` en production
- ✅ Utilise HTTPS uniquement en prod
- ✅ Ne commit JAMAIS les secrets

**Développement:**

- `make dev` pour hot reload
- Swagger: http://localhost:8000/docs
- Test JWT: `./test_jwt.sh`

---

## 📝 Changelog

### v1.1.0 (2026-06-10)

- 🔐 **Authentification JWT ajoutée**
- POST /api/v1/auth/token
- POST /api/v1/auth/token-header
- JWT requis pour /teams et /leagues
- JWT_GUIDE.md créé

### v1.0.0 (2026-06-10)

- ✅ Backend FastAPI modulaire
- ✅ Endpoints /teams et /leagues
- ✅ CORS sécurisé
- ✅ Docker simplifié

---

**Version**: 1.1.0 | **Python**: 3.13+ | **Status**: 🔐 JWT Ready
