import * as SQLite from 'expo-sqlite';
import { Guide } from './types';

const db = SQLite.openDatabaseSync('atlas.db');

// Initialize local database for caching
export const initDatabase = async (): Promise<void> => {
    try {
        // Create guides cache table
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS guides_cache (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        whatScienceSays TEXT NOT NULL,
        whatToDo TEXT NOT NULL,
        whoThisIsFor TEXT NOT NULL,
        whatNotToDo TEXT NOT NULL,
        sources TEXT NOT NULL,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);

        // Create saved guides table
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS saved_guides (
        id TEXT PRIMARY KEY,
        guideId TEXT NOT NULL,
        savedAt TEXT NOT NULL,
        FOREIGN KEY (guideId) REFERENCES guides_cache(id)
      );
    `);

        // Create sync metadata table
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sync_metadata (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
};

// Cache guides from Supabase
export const cacheGuides = async (guides: Guide[]): Promise<void> => {
    try {
        // Clear existing cache
        await db.execAsync('DELETE FROM guides_cache;');

        // Insert new guides
        const statement = await db.prepareAsync(
            `INSERT INTO guides_cache (id, title, summary, whatScienceSays, whatToDo, whoThisIsFor, whatNotToDo, sources, category, tags, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        for (const guide of guides) {
            await statement.executeAsync([
                guide.id,
                guide.title,
                guide.summary,
                JSON.stringify(guide.whatScienceSays),
                JSON.stringify(guide.whatToDo),
                guide.whoThisIsFor,
                JSON.stringify(guide.whatNotToDo),
                JSON.stringify(guide.sources),
                guide.category,
                JSON.stringify(guide.tags),
                guide.createdAt,
            ]);
        }

        await statement.finalizeAsync();

        // Update sync timestamp
        await db.execAsync(`
      INSERT OR REPLACE INTO sync_metadata (key, value, updatedAt)
      VALUES ('lastSync', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);

        console.log(`Cached ${guides.length} guides successfully`);
    } catch (error) {
        console.error('Failed to cache guides:', error);
        throw error;
    }
};

// Get all cached guides
export const getCachedGuides = async (): Promise<Guide[]> => {
    try {
        const result = await db.getAllAsync<any>('SELECT * FROM guides_cache ORDER BY createdAt DESC');

        return result.map((row) => ({
            id: row.id,
            title: row.title,
            summary: row.summary,
            whatScienceSays: JSON.parse(row.whatScienceSays),
            whatToDo: JSON.parse(row.whatToDo),
            whoThisIsFor: row.whoThisIsFor,
            whatNotToDo: JSON.parse(row.whatNotToDo),
            sources: JSON.parse(row.sources),
            category: row.category,
            tags: JSON.parse(row.tags),
            createdAt: row.createdAt,
        }));
    } catch (error) {
        console.error('Failed to get cached guides:', error);
        return [];
    }
};

// Get guide by ID from cache
export const getCachedGuideById = async (id: string): Promise<Guide | null> => {
    try {
        const result = await db.getFirstAsync<any>(
            'SELECT * FROM guides_cache WHERE id = ?',
            [id]
        );

        if (!result) return null;

        return {
            id: result.id,
            title: result.title,
            summary: result.summary,
            whatScienceSays: JSON.parse(result.whatScienceSays),
            whatToDo: JSON.parse(result.whatToDo),
            whoThisIsFor: result.whoThisIsFor,
            whatNotToDo: JSON.parse(result.whatNotToDo),
            sources: JSON.parse(result.sources),
            category: result.category,
            tags: JSON.parse(result.tags),
            createdAt: result.createdAt,
        };
    } catch (error) {
        console.error('Failed to get guide by ID:', error);
        return null;
    }
};

// Save a guide for offline access
export const saveGuideForOffline = async (guideId: string): Promise<void> => {
    try {
        await db.runAsync(
            'INSERT OR REPLACE INTO saved_guides (id, guideId, savedAt) VALUES (?, ?, ?)',
            [guideId, guideId, new Date().toISOString()]
        );
        console.log(`Guide ${guideId} saved for offline access`);
    } catch (error) {
        console.error('Failed to save guide:', error);
        throw error;
    }
};

// Remove saved guide
export const removeSavedGuide = async (guideId: string): Promise<void> => {
    try {
        await db.runAsync('DELETE FROM saved_guides WHERE guideId = ?', [guideId]);
        console.log(`Guide ${guideId} removed from saved`);
    } catch (error) {
        console.error('Failed to remove saved guide:', error);
        throw error;
    }
};

// Check if guide is saved
export const isGuideSaved = async (guideId: string): Promise<boolean> => {
    try {
        const result = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM saved_guides WHERE guideId = ?',
            [guideId]
        );
        return (result?.count ?? 0) > 0;
    } catch (error) {
        console.error('Failed to check if guide is saved:', error);
        return false;
    }
};

// Get all saved guide IDs
export const getSavedGuideIds = async (): Promise<string[]> => {
    try {
        const result = await db.getAllAsync<{ guideId: string }>(
            'SELECT guideId FROM saved_guides ORDER BY savedAt DESC'
        );
        return result.map((row) => row.guideId);
    } catch (error) {
        console.error('Failed to get saved guide IDs:', error);
        return [];
    }
};

// Get saved guides
export const getSavedGuides = async (): Promise<Guide[]> => {
    try {
        const result = await db.getAllAsync<any>(`
      SELECT gc.* FROM guides_cache gc
      INNER JOIN saved_guides sg ON gc.id = sg.guideId
      ORDER BY sg.savedAt DESC
    `);

        return result.map((row) => ({
            id: row.id,
            title: row.title,
            summary: row.summary,
            whatScienceSays: JSON.parse(row.whatScienceSays),
            whatToDo: JSON.parse(row.whatToDo),
            whoThisIsFor: row.whoThisIsFor,
            whatNotToDo: JSON.parse(row.whatNotToDo),
            sources: JSON.parse(row.sources),
            category: row.category,
            tags: JSON.parse(row.tags),
            createdAt: row.createdAt,
        }));
    } catch (error) {
        console.error('Failed to get saved guides:', error);
        return [];
    }
};

export default db;
