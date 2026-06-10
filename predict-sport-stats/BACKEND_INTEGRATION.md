# Intégration avec le Backend FastAPI

## 🔗 Configuration

### Variables d'environnement Next.js

Créer un fichier `.env.local` dans `Front/predict-sport-stats/`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# En production
# NEXT_PUBLIC_API_URL=https://api.predict-sport.com
```

## 📡 Appels API depuis Next.js

### Exemple de service API

```typescript
// lib/api/football.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  // ... autres champs
}

export interface APIResponse<T> {
  data: T[];
  metadata: Record<string, any>;
  count: number;
}

export async function getTeams(): Promise<APIResponse<Team>> {
  const response = await fetch(`${API_URL}/api/v1/teams`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important pour CORS avec credentials
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getLeagues(): Promise<APIResponse<any>> {
  const response = await fetch(`${API_URL}/api/v1/leagues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
```

### Utilisation dans un composant React

```typescript
// app/teams/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getTeams, type Team, type APIResponse } from '@/lib/api/football';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await getTeams();
        setTeams(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <img src={team.crest} alt={team.name} width={30} />
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Avec React Query (recommandé)

```typescript
// lib/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getTeams, getLeagues } from './football';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLeagues() {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: getLeagues,
    staleTime: 5 * 60 * 1000,
  });
}

// Utilisation dans un composant
import { useTeams } from '@/lib/api/queries';

export default function TeamsPage() {
  const { data, isLoading, error } = useTeams();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <h1>Teams ({data?.count})</h1>
      <ul>
        {data?.data.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔒 Sécurité

### ✅ Bonnes pratiques

1. **Ne jamais exposer les API keys** externes dans le frontend
   - Les API keys restent dans le backend FastAPI
   - Le frontend appelle uniquement le backend

2. **Validation des origines**
   - Le backend valide que les requêtes viennent du frontend autorisé
   - CORS configuré strictement

3. **En production**
   - Utiliser HTTPS pour toutes les communications
   - Définir `ENVIRONMENT=production` dans le backend
   - Mettre à jour `FRONTEND_URL` avec l'URL de production

## 🚀 Démarrage

```bash
# Terminal 1: Backend
cd /Users/henri/Vscode-DRAFT/Predict_sport
python -m Model.main

# Terminal 2: Frontend
cd Front/predict-sport-stats
npm run dev
```

Le frontend (port 3000) peut maintenant communiquer avec le backend (port 8000).
