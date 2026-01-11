# 📋 Atlas Project - Complete File Index

Quick reference to all project files and their purpose.

## 🚀 Quick Start Files
| File | Purpose |
|------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | **Start here!** 5-minute setup guide |
| [README.md](./README.md) | Full project documentation |
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Step-by-step Supabase configuration |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment checklist |

## 📱 Core App Files
| File | Purpose |
|------|---------|
| [App.tsx](./App.tsx) | Main entry point, database initialization |
| [package.json](./package.json) | Dependencies and scripts |
| [app.json](./app.json) | Expo configuration |
| [tsconfig.json](./tsconfig.json) | TypeScript configuration |

## 🎨 Source Code Structure

### `/src/screens/` - Main App Screens (5 total)
| File | Screen | Description |
|------|--------|-------------|
| HomeScreen.tsx | Home | Search, browse, popular guides |
| GuideViewScreen.tsx | Guide View | Full guide with 7 sections |
| SavedGuidesScreen.tsx | Saved | Offline saved guides list |
| CategoriesScreen.tsx | Categories | 7 category browser |
| SettingsScreen.tsx | Settings | Tier management, info |

### `/src/components/` - Reusable UI
| File | Component | Used For |
|------|-----------|----------|
| SearchBar.tsx | SearchBar | Search input with counter |
| GuideCard.tsx | GuideCard | Guide preview cards |
| GuideSection.tsx | GuideSection | Guide content sections |
| CategoryTile.tsx | CategoryTile | Category selection tiles |

### `/src/services/` - Business Logic
| File | Service | Handles |
|------|---------|---------|
| supabaseService.ts | Supabase Client | Remote data fetching, sync |
| searchService.ts | Search | Fuzzy search with Fuse.js |
| storageService.ts | Storage | Save/unsave guides |
| tierService.ts | Tier Management | Free/Premium limits |

### `/src/data/` - Data Layer
| File | Purpose |
|------|---------|
| types.ts | TypeScript interfaces (Guide, Category, etc.) |
| database.ts | SQLite setup and caching |

### `/src/styles/` - Design System
| File | Contains |
|------|----------|
| colors.ts | Calm color palette |
| typography.ts | Font system and text styles |

### `/src/navigation/` - Navigation
| File | Purpose |
|------|---------|
| AppNavigator.tsx | Tab + stack navigation setup |

## 📊 Data & Config Files
| File | Purpose |
|------|---------|
| sample-guides.sql | Example guide data for Supabase (7 guides) |
| .env.template | Environment variables template |
| .gitignore | Git ignore rules |

## 📚 Documentation
| File | Content |
|------|---------|
| QUICKSTART.md | Fast 5-minute setup |
| README.md | Complete documentation |
| SUPABASE_SETUP.md | Database setup guide |
| DEPLOYMENT.md | Production deployment |
| FILE_INDEX.md | This file |

## 🔑 Configuration Required

### Before Running
1. **Supabase Credentials** → Edit `src/services/supabaseService.ts`
2. **Database Schema** → Run SQL from SUPABASE_SETUP.md
3. **Sample Data** → Insert guides from `sample-guides.sql`

## 📦 npm Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS (Mac only)
npm run web        # Run in browser
```

## 🎯 Key Features by File

### Authentication & Tiers
- tierService.ts: Free tier (3 searches/day, 5 saves)
- tierService.ts: Premium tier (unlimited)
- SettingsScreen.tsx: Toggle tier for testing

### Search
- SearchBar.tsx: UI with counter
- searchService.ts: Fuse.js fuzzy search
- HomeScreen.tsx: Search integration

### Offline Support
- database.ts: SQLite caching
- storageService.ts: Save for offline
- SavedGuidesScreen.tsx: View saved

### Data Flow
1. App.tsx → Syncs Supabase to SQLite on startup
2. Screens → Read from cached SQLite data
3. storageService.ts → Manages saved guides locally

## 📖 Guide Structure (7 Sections)

Every guide must have these sections IN THIS ORDER:
1. Title
2. Summary  
3. What science says
4. What to do
5. Who this is for
6. What NOT to do
7. Sources

Implemented in: GuideViewScreen.tsx

## 🏗️ Architecture

```
User
  ↓
App.tsx (init)
  ↓
AppNavigator (routing)
  ↓
Screens (5 screens)
  ↓
Services (business logic)
  ↓
Database Layer
  ├── Supabase (remote, source of truth)
  └── SQLite (local cache, offline)
```

## 🎨 Design System

**Colors**: `src/styles/colors.ts`  
- Calm, muted palette
- Blues, grays, earth tones
- No aggressive colors

**Typography**: `src/styles/typography.ts`  
- Clear hierarchy
- Professional, readable
- System fonts

## ✅ Complete Checklist

- [x] 5 screens exactly
- [x] Supabase integration
- [x] SQLite caching
- [x] Fuzzy search
- [x] Tier system
- [x] Offline support
- [x] Calm design
- [x] TypeScript
- [x] Documentation
- [ ] Configure Supabase (user action)
- [ ] Add 30-50 guides (user action)
- [ ] Test on device (user action)

---

**Next Step**: Follow [QUICKSTART.md](./QUICKSTART.md) to get running!
