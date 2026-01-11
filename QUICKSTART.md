# Atlas Quick Start Guide

Get your Atlas app running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- A Supabase account (free at [supabase.com](https://supabase.com))

## Quick Setup

### 1. Install Dependencies (1 min)

```bash
cd ATLAS
npm install
```

### 2. Configure Supabase (2 min)

See detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md), or quick version:

1. Create project at [supabase.com](https://supabase.com)
2. Copy your Project URL and anon key
3. Edit `src/services/supabaseService.ts`:

```typescript
const SUPABASE_URL = 'your-url-here';
const SUPABASE_ANON_KEY = 'your-key-here';
```

4. Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE guides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  "whatScienceSays" JSONB NOT NULL,
  "whatToDo" JSONB NOT NULL,
  "whoThisIsFor" TEXT NOT NULL,
  "whatNotToDo" JSONB NOT NULL,
  sources JSONB NOT NULL,
  category TEXT NOT NULL,
  tags JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE POLICY "Public read access" ON guides
  FOR SELECT USING (true);
```

5. Copy guides from `sample-guides.sql` into SQL Editor and run

### 3. Start the App (30 sec)

```bash
npm start
```

Scan the QR code with Expo Go!

## First Time Using the App

1. **Home Screen**: Search should work immediately
2. **Free Tier**: You start with 3 searches/day, 5 saved guides
3. **Test Premium**: Go to Settings → Toggle "Subscription" to Premium
4. **Save a Guide**: Open any guide → Tap "Save guide"
5. **Offline Test**: Save a few guides, turn on airplane mode, open them

## Common Issues

**"Supabase not configured" error**
- You need to replace the placeholder values in `supabaseService.ts`

**No guides showing**
- Check you ran the SQL to insert sample guides
- Verify RLS policy is set (see step 2.4 above)

**App won't start**
- Run `npm install` again
- Try `npm start -- --clear`

**TypeScript errors**
- Run `npx tsc --noEmit` to check
- Should compile with 0 errors

## Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator (Mac only)
npm run web        # Run in web browser
```

## Testing Checklist

- [ ] Search for "sleep" → Should return sleep guides
- [ ] Search with typo "slep" → Should still find sleep guides
- [ ] Perform 3 searches → 4th should be blocked (free tier)
- [ ] Save 5 guides → 6th should be blocked (free tier)
- [ ] Toggle Premium in Settings → Limits removed
- [ ] Save a guide → Restart app → Still saved
- [ ] Browse all 7 categories
- [ ] View a complete guide (all 7 sections present)

## Next Steps

1. **Add More Guides**: Populate with 30-50 guides (see `sample-guides.sql`)
2. **Customize Design**: Edit colors in `src/styles/colors.ts`
3. **Test on Real Device**: Install Expo Go and scan QR
4. **Build Standalone App**: See [Building for Production](#building-for-production)

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

## Need Help?

- **Docs**: See [README.md](./README.md) for full documentation
- **Supabase Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Implementation Details**: See walkthrough artifact

---

**You're ready to go! 🚀**

Open the app and start exploring your science-backed knowledge library.
