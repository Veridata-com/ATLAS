// Web-compatible database layer using localStorage instead of SQLite
// This works on both web and mobile (falls back to AsyncStorage on mobile)
import { Guide } from './types';

// For web: use localStorage
// For mobile: this will be enhanced with SQLite later
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Simple in-memory cache for guides
let guidesCache: Guide[] = [];
let savedGuideIdsCache: string[] = [];

// Initialize database (no-op for web, as we use localStorage)
export const initDatabase = async (): Promise<void> => {
    console.log('Database initialized (web-compatible)');

    // Load saved guide IDs from localStorage
    if (isWeb) {
        const saved = localStorage.getItem('atlas_saved_guides');
        if (saved) {
            savedGuideIdsCache = JSON.parse(saved);
        }
    }
};

// Cache guides from Supabase
export const cacheGuides = async (guides: Guide[]): Promise<void> => {
    try {
        guidesCache = guides;

        if (isWeb) {
            localStorage.setItem('atlas_guides_cache', JSON.stringify(guides));
            localStorage.setItem('atlas_last_sync', new Date().toISOString());
        }

        console.log(`Cached ${guides.length} guides successfully`);
    } catch (error) {
        console.error('Failed to cache guides:', error);
        throw error;
    }
};

// Get all cached guides
export const getCachedGuides = async (): Promise<Guide[]> => {
    try {
        // Return from memory cache first
        if (guidesCache.length > 0) {
            return guidesCache;
        }

        // Try to load from localStorage (web only)
        if (isWeb) {
            const cached = localStorage.getItem('atlas_guides_cache');
            if (cached) {
                guidesCache = JSON.parse(cached);
                return guidesCache;
            }
        }

        return [];
    } catch (error) {
        console.error('Failed to get cached guides:', error);
        return [];
    }
};

// Get guide by ID from cache
export const getCachedGuideById = async (id: string): Promise<Guide | null> => {
    try {
        const guides = await getCachedGuides();
        return guides.find((guide) => guide.id === id) || null;
    } catch (error) {
        console.error('Failed to get guide by ID:', error);
        return null;
    }
};

// Save a guide for offline access
export const saveGuideForOffline = async (guideId: string): Promise<void> => {
    try {
        if (!savedGuideIdsCache.includes(guideId)) {
            savedGuideIdsCache.push(guideId);

            if (isWeb) {
                localStorage.setItem('atlas_saved_guides', JSON.stringify(savedGuideIdsCache));
            }
        }
        console.log(`Guide ${guideId} saved for offline access`);
    } catch (error) {
        console.error('Failed to save guide:', error);
        throw error;
    }
};

// Remove saved guide
export const removeSavedGuide = async (guideId: string): Promise<void> => {
    try {
        savedGuideIdsCache = savedGuideIdsCache.filter((id) => id !== guideId);

        if (isWeb) {
            localStorage.setItem('atlas_saved_guides', JSON.stringify(savedGuideIdsCache));
        }

        console.log(`Guide ${guideId} removed from saved`);
    } catch (error) {
        console.error('Failed to remove saved guide:', error);
        throw error;
    }
};

// Check if guide is saved
export const isGuideSaved = async (guideId: string): Promise<boolean> => {
    try {
        return savedGuideIdsCache.includes(guideId);
    } catch (error) {
        console.error('Failed to check if guide is saved:', error);
        return false;
    }
};

// Get all saved guide IDs
export const getSavedGuideIds = async (): Promise<string[]> => {
    try {
        return savedGuideIdsCache;
    } catch (error) {
        console.error('Failed to get saved guide IDs:', error);
        return [];
    }
};

// Get saved guides
export const getSavedGuides = async (): Promise<Guide[]> => {
    try {
        const allGuides = await getCachedGuides();
        return allGuides.filter((guide) => savedGuideIdsCache.includes(guide.id));
    } catch (error) {
        console.error('Failed to get saved guides:', error);
        return [];
    }
};
