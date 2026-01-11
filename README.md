# Atlas - Minimalist Science-Backed Knowledge Library

Atlas is a production-ready mobile app MVP providing calm, trustworthy, evidence-based guidance through short, structured guides.

## Core Principles

1. Trust over engagement
2. Clarity over features
3. Calm over stimulation
4. Authority over opinion

## Features

### 5 Core Screens
- **Home/Search**: Search guides with fuzzy matching, browse popular and recent guides
- **Guide View**: Structured guide display with 7 sections (What science says, What to do, etc.)
- **Saved Guides**: Offline access to saved guides
- **Categories**: Browse 7 categories (Physical Health, Mental Health, Fitness, Nutrition, Sleep, Focus, Stress)
- **Settings**: Minimal settings including tier management

### Search Functionality
- Fuzzy search with typo tolerance
- Weighted matching (Title > Tags > Body)
- Relevance-based ranking

### Tier System
**Free Tier**:
- 3 searches per day
- 5 saved guides maximum

**Premium Tier**:
- Unlimited searches
- Unlimited saved guides

### Data Architecture
- **Remote Database**: Supabase (PostgreSQL) for guide content
- **Local Cache**: SQLite for offline access and performance
- Automatic sync on app startup

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a `guides` table with the following schema:

```sql
CREATE TABLE guides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  whatScienceSays JSONB NOT NULL,
  whatToDo JSONB NOT NULL,
  whoThisIsFor TEXT NOT NULL,
  whatNotToDo JSONB NOT NULL,
  sources JSONB NOT NULL,
  category TEXT NOT NULL,
  tags JSONB NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```

3. Add your Supabase credentials in `src/services/supabaseService.ts`:

```typescript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 3. Populate Guides Data

Add 30-50 guides to your Supabase database. Each guide should follow this structure:

- **title**: Clear, factual title
- **summary**: One-sentence explanation
- **whatScienceSays**: Array of 3-6 bullet points
- **whatToDo**: Array of actionable steps
- **whoThisIsFor**: String describing target audience
- **whatNotToDo**: Array of common myths/mistakes
- **sources**: Array of scientific references
- **category**: One of the 7 categories
- **tags**: Array of search tags

### 4. Run the App

```bash
# Start Expo development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Project Structure

```
ATLAS/
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Types and database setup
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Main app screens
│   ├── services/        # Business logic (search, storage, tier, Supabase)
│   └── styles/          # Colors and typography
├── App.tsx              # Main app entry point
└── package.json
```

## Design Philosophy

- **Minimalist UI** with large margins
- **Calm color palette** (muted blues, grays, earth tones)
- **Professional typography**
- **No aggressive animations**
- Creates a feeling of trust and calm

## What's NOT Included (By Design)

- No AI chat interface
- No social features
- No comments or likes
- No streaks or gamification
- No habit tracking
- No coaching features

## Development Notes

- Built with React Native + Expo for cross-platform support
- TypeScript for type safety
- SQLite for local caching and offline support
- Fuse.js for fuzzy search
- React Navigation for screen management

## License

MIT
