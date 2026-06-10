# Predict Sport Stats - Frontend

Interface web moderne pour visualiser et analyser les statistiques de football en temps réel.

## 🚀 Technologies

- **Framework:** Next.js 15 (App Router + Turbopack)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 4
- **UI Components:** Components personnalisés avec Tailwind
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos valeurs
```

### Variables d'environnement requises

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_AUTH_KEY=your_api_key_here
```

## 🛠️ Commandes

```bash
# Développement (avec Turbopack)
npm run dev

# Build de production
npm run build

# Démarrer le serveur de production
npm start

# Linter
npm run lint
```

## 📁 Structure du projet

```
predict-sport-stats/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux
│   ├── teams/               # Pages équipes
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── leagues/             # Pages ligues
│       ├── page.tsx
│       └── loading.tsx
├── components/              # Composants React
│   ├── ui/                  # Composants UI génériques
│   │   └── Card.tsx
│   ├── layout/              # Composants de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── teams/               # Composants équipes
│   │   ├── TeamGrid.tsx
│   │   └── TeamCard.tsx
│   └── leagues/             # Composants ligues
│       ├── LeagueGrid.tsx
│       └── LeagueCard.tsx
├── lib/                     # Utilitaires et services
│   └── api/                 # Services API
│       ├── auth.ts          # Authentification JWT
│       ├── teams.ts         # API Teams
│       └── leagues.ts       # API Leagues
├── types/                   # Types TypeScript
│   └── index.ts             # Types principaux
└── public/                  # Assets statiques
```

## 🔐 Authentification

Le frontend utilise l'authentification JWT avec le backend:

1. À chaque requête, un token JWT est obtenu via `/api/v1/auth/token`
2. Le token est utilisé dans l'en-tête `Authorization: Bearer {token}`
3. Les tokens sont gérés automatiquement par le service `fetchWithAuth`

## 🎨 Features

### Page d'accueil
- Navigation claire vers Équipes et Ligues
- Design moderne avec gradients
- Mode sombre automatique

### Page Équipes
- Grille responsive d'équipes
- Affichage des logos, noms, et statistiques
- Information détaillée (fondation, couleurs, stade, site web)
- Images optimisées avec Next.js Image

### Page Ligues
- Grille responsive de ligues
- Logos et types de compétitions
- Design cohérent avec la page équipes

### Composants UI
- **Card**: Composant de carte réutilisable
- **Header**: Navigation principale
- **Footer**: Pied de page avec liens
- **TeamCard/LeagueCard**: Cartes spécialisées pour équipes et ligues

## 🌐 API Backend

Le frontend se connecte au backend FastAPI:

- **Base URL:** `http://localhost:8000`
- **Endpoints:**
  - `POST /api/v1/auth/token` - Obtenir un token JWT
  - `GET /api/v1/teams` - Liste des équipes
  - `GET /api/v1/leagues` - Liste des ligues

## 📱 Responsive Design

L'interface est entièrement responsive avec des breakpoints Tailwind:

- **Mobile:** 1 colonne
- **Tablet (md):** 2 colonnes
- **Desktop (lg):** 3 colonnes
- **Large Desktop (xl):** 4 colonnes

## 🎨 Thème

Support automatique du mode sombre via `prefers-color-scheme`:

- Mode clair: fond blanc, texte sombre
- Mode sombre: fond gris foncé, texte clair
- Transitions fluides entre les modes

## 🚦 Loading & Error States

- **Loading:** Composants `loading.tsx` avec skeletons
- **Error:** Composants `error.tsx` avec retry
- **Suspense:** Chargement progressif avec React Suspense

## 🔄 Server Components

Le projet utilise les React Server Components de Next.js:

- Pas de JavaScript côté client pour le rendu initial
- Meilleure performance et SEO
- Requêtes API directement dans les composants serveur

## 🛡️ Sécurité

- Variables d'environnement pour les secrets
- Authentification JWT pour toutes les requêtes API
- Validation des types avec TypeScript
- Images optimisées et sécurisées

## 📄 Licence

Ce projet fait partie de Predict Sport Stats.
