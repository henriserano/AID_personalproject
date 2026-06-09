#!/bin/bash
# Script de test pour l'authentification JWT

echo "🔐 Test JWT Authentication"
echo ""

API_URL="http://localhost:8000"
API_KEY="la cle magique de DTS"

# Test 1: Obtenir un token
echo "1️⃣  Obtenir un JWT token..."
TOKEN_RESPONSE=$(curl -s -X POST "$API_URL/api/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d "{\"api_key\": \"$API_KEY\"}")

TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.access_token' 2>/dev/null)

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "❌ Échec de l'obtention du token"
    echo "Response: $TOKEN_RESPONSE"
    exit 1
fi

echo "✅ Token obtenu: ${TOKEN:0:50}..."
echo ""

# Test 2: Appeler /teams sans token (doit échouer)
echo "2️⃣  Test /teams SANS token (doit échouer)..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/v1/teams")

if [ "$RESPONSE" == "403" ] || [ "$RESPONSE" == "401" ]; then
    echo "✅ 401/403 reçu (attendu)"
else
    echo "⚠️  Code HTTP: $RESPONSE (attendu 401/403)"
fi
echo ""

# Test 3: Appeler /teams avec token (doit réussir)
echo "3️⃣  Test /teams AVEC token..."
TEAMS_RESPONSE=$(curl -s "$API_URL/api/v1/teams" \
  -H "Authorization: Bearer $TOKEN")

TEAMS_COUNT=$(echo $TEAMS_RESPONSE | jq -r '.count' 2>/dev/null)

if [ "$TEAMS_COUNT" != "null" ] && [ ! -z "$TEAMS_COUNT" ]; then
    echo "✅ Données reçues: $TEAMS_COUNT équipes"
else
    echo "❌ Erreur: $TEAMS_RESPONSE"
fi
echo ""

# Test 4: Appeler /leagues avec token
echo "4️⃣  Test /leagues AVEC token..."
LEAGUES_RESPONSE=$(curl -s "$API_URL/api/v1/leagues" \
  -H "Authorization: Bearer $TOKEN")

LEAGUES_COUNT=$(echo $LEAGUES_RESPONSE | jq -r '.count' 2>/dev/null)

if [ "$LEAGUES_COUNT" != "null" ] && [ ! -z "$LEAGUES_COUNT" ]; then
    echo "✅ Données reçues: $LEAGUES_COUNT ligues"
else
    echo "❌ Erreur: $LEAGUES_RESPONSE"
fi
echo ""

echo "✨ Tests JWT terminés!"
