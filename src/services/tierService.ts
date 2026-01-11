// Web-compatible tier service using localStorage
import { UserTier, UserPreferences } from '../data/types';

const USER_PREFS_KEY = 'atlas_user_preferences';
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const DEFAULT_PREFERENCES: UserPreferences = {
    tier: UserTier.Free,
    searchCount: 0,
    lastSearchReset: new Date().toISOString(),
    savedGuideIds: [],
};

// Tier limits
export const TIER_LIMITS = {
    [UserTier.Free]: {
        maxSearchesPerDay: 3,
        maxSavedGuides: 5,
    },
    [UserTier.Premium]: {
        maxSearchesPerDay: Infinity,
        maxSavedGuides: Infinity,
    },
};

// Get user preferences
export const getUserPreferences = async (): Promise<UserPreferences> => {
    try {
        if (isWeb) {
            const prefs = localStorage.getItem(USER_PREFS_KEY);
            if (!prefs) {
                await saveUserPreferences(DEFAULT_PREFERENCES);
                return DEFAULT_PREFERENCES;
            }
            return JSON.parse(prefs);
        }
        return DEFAULT_PREFERENCES;
    } catch (error) {
        console.error('Failed to get user preferences:', error);
        return DEFAULT_PREFERENCES;
    }
};

// Save user preferences
export const saveUserPreferences = async (preferences: UserPreferences): Promise<void> => {
    try {
        if (isWeb) {
            localStorage.setItem(USER_PREFS_KEY, JSON.stringify(preferences));
        }
    } catch (error) {
        console.error('Failed to save user preferences:', error);
    }
};

// Get user tier
export const getUserTier = async (): Promise<UserTier> => {
    const prefs = await getUserPreferences();
    return prefs.tier;
};

// Set user tier (for testing/subscription)
export const setUserTier = async (tier: UserTier): Promise<void> => {
    const prefs = await getUserPreferences();
    prefs.tier = tier;
    await saveUser Preferences(prefs);
};

// Check if user needs to reset daily search count
const shouldResetSearchCount = (lastResetDate: string): boolean => {
    const lastReset = new Date(lastResetDate);
    const now = new Date();

    // Check if it's a new day (local time)
    return (
        now.getDate() !== lastReset.getDate() ||
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear()
    );
};

// Reset search count if needed
const resetSearchCountIfNeeded = async (prefs: UserPreferences): Promise<UserPreferences> => {
    if (shouldResetSearchCount(prefs.lastSearchReset)) {
        prefs.searchCount = 0;
        prefs.lastSearchReset = new Date().toISOString();
        await saveUserPreferences(prefs);
    }
    return prefs;
};

// Check if user can perform a search
export const canPerformSearch = async (): Promise<{ canSearch: boolean; remainingSearches: number }> => {
    let prefs = await getUserPreferences();
    prefs = await resetSearchCountIfNeeded(prefs);

    const limits = TIER_LIMITS[prefs.tier];
    const canSearch = prefs.searchCount < limits.maxSearchesPerDay;
    const remainingSearches = Math.max(0, limits.maxSearchesPerDay - prefs.searchCount);

    return { canSearch, remainingSearches };
};

// Increment search count
export const incrementSearchCount = async (): Promise<void> => {
    let prefs = await getUserPreferences();
    prefs = await resetSearchCountIfNeeded(prefs);

    prefs.searchCount += 1;
    await saveUserPreferences(prefs);
};

// Check if user can save a guide
export const canSaveGuide = async (currentSavedCount: number): Promise<{ canSave: boolean; remainingSlots: number }> => {
    const prefs = await getUserPreferences();
    const limits = TIER_LIMITS[prefs.tier];

    const canSave = currentSavedCount < limits.maxSavedGuides;
    const remainingSlots = limits.maxSavedGuides === Infinity
        ? Infinity
        : Math.max(0, limits.maxSavedGuides - currentSavedCount);

    return { canSave, remainingSlots };
};

// Get remaining searches for today
export const getRemainingSearches = async (): Promise<number> => {
    const { remainingSearches } = await canPerformSearch();
    return remainingSearches;
};

// Check if user is premium
export const isPremiumUser = async (): Promise<boolean> => {
    const tier = await getUserTier();
    return tier === UserTier.Premium;
};
