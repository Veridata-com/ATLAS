import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    saveGuideForOffline,
    removeSavedGuide,
    isGuideSaved,
    getSavedGuideIds,
    getSavedGuides,
} from '../data/database';
import { Guide } from '../data/types';
import { canSaveGuide } from './tierService';

// Save a guide for offline access
export const saveGuide = async (guideId: string): Promise<{ success: boolean; error?: string }> => {
    try {
        // Check current saved count
        const savedIds = await getSavedGuideIds();
        const currentCount = savedIds.length;

        // Check if already saved
        if (savedIds.includes(guideId)) {
            return { success: false, error: 'Guide is already saved' };
        }

        // Check tier limits
        const { canSave, remainingSlots } = await canSaveGuide(currentCount);

        if (!canSave) {
            return {
                success: false,
                error: `You've reached your saved guides limit. Upgrade to Premium for unlimited saves.`,
            };
        }

        // Save the guide
        await saveGuideForOffline(guideId);

        return { success: true };
    } catch (error) {
        console.error('Failed to save guide:', error);
        return { success: false, error: 'Failed to save guide' };
    }
};

// Remove a saved guide
export const unsaveGuide = async (guideId: string): Promise<{ success: boolean; error?: string }> => {
    try {
        await removeSavedGuide(guideId);
        return { success: true };
    } catch (error) {
        console.error('Failed to unsave guide:', error);
        return { success: false, error: 'Failed to remove guide' };
    }
};

// Check if a guide is saved
export const checkIfGuideSaved = async (guideId: string): Promise<boolean> => {
    try {
        return await isGuideSaved(guideId);
    } catch (error) {
        console.error('Failed to check if guide is saved:', error);
        return false;
    }
};

// Get all saved guides
export const getAllSavedGuides = async (): Promise<Guide[]> => {
    try {
        return await getSavedGuides();
    } catch (error) {
        console.error('Failed to get saved guides:', error);
        return [];
    }
};

const PINNED_GUIDES_KEY = '@user_pinned_guides';

export const getPinnedGuideIds = async (): Promise<string[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(PINNED_GUIDES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to fetch pinned guides', e);
        return [];
    }
};

export const pinGuide = async (guideId: string): Promise<void> => {
    try {
        const currentPinned = await getPinnedGuideIds();
        if (!currentPinned.includes(guideId)) {
            const newPinned = [...currentPinned, guideId];
            await AsyncStorage.setItem(PINNED_GUIDES_KEY, JSON.stringify(newPinned));
        }
    } catch (e) {
        console.error('Failed to pin guide', e);
    }
};

export const unpinGuide = async (guideId: string): Promise<void> => {
    try {
        const currentPinned = await getPinnedGuideIds();
        const newPinned = currentPinned.filter(id => id !== guideId);
        await AsyncStorage.setItem(PINNED_GUIDES_KEY, JSON.stringify(newPinned));
    } catch (e) {
        console.error('Failed to unpin guide', e);
    }
};

export const isGuidePinned = async (guideId: string): Promise<boolean> => {
    const pinned = await getPinnedGuideIds();
    return pinned.includes(guideId);
};

// Get saved guides count
export const getSavedGuidesCount = async (): Promise<number> => {
    try {
        const ids = await getSavedGuideIds();
        return ids.length;
    } catch (error) {
        console.error('Failed to get saved guides count:', error);
        return 0;
    }
};
