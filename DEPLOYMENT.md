# Atlas - Deployment Checklist

This checklist ensures your Atlas app is ready for production deployment.

## Pre-Deployment

### ✅ Code & Configuration
- [ ] Supabase credentials configured in `src/services/supabaseService.ts`
- [ ] Database schema created in Supabase
- [ ] RLS policies set (public SELECT on guides table)
- [ ] 30-50 guides added to database across all 7 categories
- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] App runs without errors in Expo Go

### ✅ Content Quality
- [ ] All guides have complete 7-section structure
- [ ] Sources are scientific/institutional (not blogs or opinion pieces)
- [ ] "What to do" sections are actionable and safe
- [ ] No extreme or dangerous advice included
- [ ] Categories properly distributed
- [ ] Tags relevant for search

### ✅ Testing
- [ ] Search works with normal queries
- [ ] Search works with typos (fuzzy matching)
- [ ] Free tier limits enforced (3 searches, 5 saves)
- [ ] Premium tier removes limits
- [ ] Guides save/unsave correctly
- [ ] Saved guides persist across app restarts
- [ ] All 7 categories show guides
- [ ] Offline mode works for saved guides
- [ ] App loads guides from Supabase on first launch

### ✅ Design Review
- [ ] UI feels calm and minimal
- [  ] No jarring colors or aggressive animations
- [ ] Typography is readable
- [ ] Spacing is generous
- [ ] All 5 screens match specification exactly

## Production Build

### 1. Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### 2. Configure Project

```bash
cd ATLAS
eas build:configure
```

This creates `eas.json`. Review and commit it.

### 3. Configure App Identity

Edit `app.json`:

```json
{
  "expo": {
    "name": "Atlas",
    "slug": "atlas-knowledge",
    "scheme": "atlas",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.atlas",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.atlas",
      "versionCode": 1
    }
  }
}
```

### 4. Build for Platforms

**Android (APK for testing)**:
```bash
eas build --profile preview --platform android
```

**Android (Production)**:
```bash
eas build --platform android
```

**iOS (requires Apple Developer account - $99/year)**:
```bash
eas build --platform ios
```

### 5. Submit to Stores

**Google Play**:
```bash
eas submit --platform android
```

**App Store**:
```bash
eas submit --platform ios
```

## App Store Requirements

### App Store Connect (iOS)

1. **App Name**: Atlas
2. **Subtitle**: Science-backed knowledge library
3. **Description**:
```
Atlas is a minimalist knowledge library providing calm, trustworthy, 
evidence-based guidance through short, structured guides.

Key Features:
• Search 30+ science-backed guides
• 7 health & productivity categories
• Save guides for offline access
• No ads, no social features, no gamification

Just calm, authoritative knowledge when you need it.
```
4. **Keywords**: health,wellness,science,knowledge,guides,productivity,mental health,fitness,nutrition,sleep
5. **Privacy Policy**: Required (create simple policy stating no data collection)
6. **Category**: Health & Fitness or Education
7. **Screenshots**: 5-8 screenshots showing all screens

### Google Play Console (Android)

Same content as iOS, plus:
1. **Feature Graphic**: 1024x500px banner
2. **App Icon**: 512x512px
3. **Privacy Policy URL**: Required

## Post-Launch

### Analytics (Optional, Privacy-Focused)

Consider adding:
- Plausible Analytics (GDPR compliant, no cookies)
- Simple metrics: DAU, guide views, searches

### Monitoring

- Set up Sentry or similar for crash reporting
- Monitor Supabase usage to stay within free tier
- Track user feedback

### Content Updates

- Add new guides monthly
- Update existing guides with new research
- Monitor which categories are most popular

## Marketing (If Desired)

### Launch Strategy
1. Product Hunt launch
2. Reddit: r/productivity, r/science, r/apps
3. Twitter/X announcement
4. Indie Hackers post

### Positioning
- "Anti-social app"
- "Knowledge without engagement tricks"
- "Trust over likes"

## Legal

- [ ] Privacy policy created
- [ ] Terms of service (optional for MVP)
- [ ] Copyright on content clear
- [ ] Scientific sources properly attributed

## Maintenance Plan

**Weekly**:
- Check crash reports
- Review user feedback

**Monthly**:
- Add 2-5 new guides
- Update one existing guide

**Quarterly**:
- Review analytics
- Update app based on feedback
- Consider new categories (only if essential)

---

## Quick Reference

**Expo Go Testing**: `npm start`  
**Build Android**: `eas build -p android`  
**Build iOS**: `eas build -p ios`  
**Submit**: `eas submit -p [platform]`  
**Check Status**: `eas build:list`

---

Your Atlas app is ready to help people find calm, trustworthy knowledge! 🌍
