# Atlas - Quick Start (Web + Mobile)

Get Atlas running on **web (for Vercel** AND **mobile**!

## ✅ You Can Now Test On:
- **Web Browser** → `npm run web` (for local testing + Vercel deployment)
- **Mobile (Expo Go)** → `npm start` then scan QR code
- **Production** → Vercel for web, App Store/Play Store for mobile

---

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase

Edit `src/services/supabaseService.ts`:
```typescript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for full setup instructions.

### 3. Run Locally

**For Web** (works now!):
```bash
npm run web
```
Opens at `http://localhost:8081` - this is what Vercel will serve!

**For Mobile**:
```bash
npm start
```
Scan QR with Expo Go app.

---

## 🌐 Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel auto-detects Expo!
5. Add environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` = your anon key
6. Deploy!

###Method 2: Via CLI
```bash
npm install -g vercel
vercel
```

Your app will be live at `https://your-project.vercel.app`!

---

## 📱 Architecture

- **Web**: Uses localStorage (works in all browsers)
- **Mobile**: Same code, runs natively via Expo
- **Data**: Supabase backend for both platforms
- **Offline**: localStorage (web) keeps guides cached

---

## ✨ What Works Now

✅ All 5 screens (Home, Guide View, Saved, Categories, Settings)
✅ Search with fuzzy matching  
✅ Save/unsave guides
✅ Free/Premium tier limits
✅ Offline support (via localStorage on web)
✅ Web-compatible (runs in browsers!)
✅ Mobile-ready (via Expo)

---

## 🔧 Development

**Web**:
```bash
npm run web      # Start web dev server
```

**Mobile**:
```bash
npm start        # Start Expo
npm run android  # Android emulator
npm run ios      # iOS simulator (Mac only)
```

**Build**:
```bash
expo export -p web   # Build for Vercel/web
eas build            # Build native apps
```

---

## 📝 Next Steps

1. ✅ **Configure Supabase** - Add your credentials
2. ✅ **Add Guides** - Insert 30-50 guides into Supabase
3. ✅ **Test Web** - Run `npm run web`
4. ✅ **Deploy to Vercel** - Push to Git, connect to Vercel
5. ✅ **Test Mobile** - Run on Expo Go

---

## 🎯 File Structure

```
ATLAS/
├── src/
│   ├── components/     # 4 components ✅
│   ├── data/           # Types & database ✅
│   ├── navigation/     # Tab + stack nav ✅
│   ├── screens/       # 5 screens ✅
│   ├── services/       # Supabase, search, tier ✅
│   └── styles/         # Colors & typography ✅
├── App.tsx            # Main entry ✅
├── vercel.json        # Vercel config ✅
└── package.json       # Dependencies ✅
```

All files restored! ✅

---

## 🐛 Troubleshooting

**Vercel shows 404**:
- Make sure `vercel.json` exists
- Check build command: `expo export -p web`
- Output directory should be: `dist`

**App won't start**:
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Supabase credentials

**No guides showing**:
- Configure Supabase (see step 2)
- Add guides to Supabase database
- Check browser console for errors

---

You're all set! 🎉
