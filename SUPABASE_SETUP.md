# Supabase Setup Guide for Atlas

This guide walks you through setting up Supabase as the backend for your Atlas app.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose an organization (or create one)
4. Enter project details:
   - **Name**: Atlas-Production (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing**: Free tier is fine for MVP
5. Click "Create new project"
6. Wait 2-3 minutes for provisioning

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, click on your project
2. Go to **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

4. Open `src/services/supabaseService.ts` in your Atlas project
5. Replace the placeholder values:

```typescript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-key-here';
```

## Step 3: Create the Guides Table

1. In Supabase dashboard, go to **Table Editor** (database icon)
2. Click **New Table**
3. Or go to **SQL Editor** and run this:

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

-- Add index for better search performance
CREATE INDEX idx_guides_category ON guides(category);
CREATE INDEX idx_guides_created ON guides("createdAt" DESC);
```

## Step 4: Set Row Level Security (RLS)

For MVP, we'll allow public read access:

1. Go to **Authentication** → **Policies**
2. Find the `guides` table
3. Click **New Policy**
4. Choose **For a custom policy**
5. Enter:
   - **Policy name**: Public read access
   - **Allowed operation**: SELECT
   - **Target roles**: public
   - **USING expression**: `true`
6. Click **Review** → **Save policy**

## Step 5: Add Sample Guide Data

Copy and run the queries from `sample-guides.sql` in the SQL Editor:

```sql
-- Example: Add one guide
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-hydration-001',
  'Proper Hydration for Health',
  'Learn how to maintain optimal hydration for physical and cognitive performance.',
  '["Water makes up 60% of body weight...", "..."]'::jsonb,
  '["Drink water consistently...", "..."]'::jsonb,
  'Anyone looking to maintain basic health',
  '["Don''t wait until extremely thirsty", "..."]'::jsonb,
  '["American Journal of Clinical Nutrition, 2010", "..."]'::jsonb,
  'Physical Health',
  '["hydration", "water", "health"]'::jsonb,
  NOW()
);

-- Add 29-49 more guides following the pattern...
```

**Tip**: Create at least 10 guides across different categories for meaningful testing.

## Step 6: Verify Setup

1. In Supabase, go to **Table Editor** → **guides**
2. You should see your inserted guides
3. Click on a row to verify all fields are populated

## Step 7: Test the Connection

1. In your Atlas project, run: `npm start`
2. Open the app in Expo Go
3. You should see:
   - "Loading Atlas... Syncing guides from Supabase"
   - Then the home screen with your guides visible

If you see "⚠️ Setup Required", double-check your credentials in `supabaseService.ts`.

## Troubleshooting

### Issue: "Supabase not configured"
- Check that you replaced both `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Make sure there are no quotes or extra spaces

### Issue: "Failed to sync from Supabase"
- Verify RLS policy allows public SELECT
- Check your internet connection
- Look at browser console in Supabase dashboard for errors

### Issue: No guides appearing
- Run `SELECT * FROM guides;` in SQL Editor to verify data exists
- Check that guide structure matches the TypeScript interface
- Verify JSON fields are valid JSONB format

### Issue: App crashes on guide view
- Ensure all required fields are non-null in database
- Check that arrays (whatScienceSays, etc.) have at least one item
- Verify category matches one of the 7 allowed values

## Content Guidelines

When adding guides, ensure:
- **Title**: Clear, factual, 5-10 words
- **Summary**: One sentence, under 150 characters
- **What Science Says**: 3-6 bullet points with research backing
- **What To Do**: 3-8 clear, actionable steps
- **Who This Is For**: 1-2 sentences describing target audience
- **What NOT To Do**: 3-6 common mistakes or myths
- **Sources**: Scientific papers, meta-analyses, or institutional sources
- **Category**: Must be one of: Physical Health, Mental Health, Fitness & Training, Nutrition, Sleep & Recovery, Focus & Productivity, Stress & Anxiety
- **Tags**: 3-8 relevant keywords for search

## Example Guide Template

```sql
INSERT INTO guides VALUES (
  'unique-id-here',
  'Title Here',
  'One sentence summary here.',
  '["Science point 1", "Science point 2", "Science point 3"]'::jsonb,
  '["Action step 1", "Action step 2", "Action step 3"]'::jsonb,
  'Description of who this guide is for.',
  '["Don''t do this", "Avoid that", "Common mistake"]'::jsonb,
  '["Journal Name, Year: Title", "Institution: Study name"]'::jsonb,
  'Mental Health',
  '["keyword1", "keyword2", "keyword3"]'::jsonb,
  NOW()
);
```

## Security Notes

- The `anon` key is safe to use in client apps (rate-limited by Supabase)
- Never commit your `.env` file with credentials
- For production, consider adding more granular RLS policies
- Monitor usage in Supabase dashboard to stay within free tier

## Done!

Your Atlas app is now connected to Supabase and ready to sync guides!
