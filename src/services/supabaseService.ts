import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Guide } from '../data/types';
import { cacheGuides } from '../data/database';

// TODO: Replace with your Supabase project URL and anon key
const SUPABASE_URL: string = 'https://htljexjylgwcogssrvtf.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bGpleGp5bGd3Y29nc3NydnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDMzMDgsImV4cCI6MjA4MzcxOTMwOH0.ATqn8QdV3UMdlUXc8MLuv1KVSsrCcexb5eO2sZNbztg';

let supabase: SupabaseClient | null = null;

// Initialize Supabase client
export const initSupabase = (): SupabaseClient => {
    if (!supabase) {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabase;
};

// Fetch all guides from Supabase
export const fetchGuidesFromSupabase = async (): Promise<Guide[]> => {
    try {
        const client = initSupabase();

        const { data, error } = await client
            .from('guides')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Supabase fetch error:', error);
            throw error;
        }

        console.log(`Fetched ${data?.length || 0} guides from Supabase`);
        return data as Guide[] || [];
    } catch (error) {
        console.error('Failed to fetch guides from Supabase:', error);
        throw error;
    }
};

// Fetch guides by category
export const fetchGuidesByCategory = async (category: string): Promise<Guide[]> => {
    try {
        const client = initSupabase();

        const { data, error } = await client
            .from('guides')
            .select('*')
            .eq('category', category)
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Supabase fetch error:', error);
            throw error;
        }

        return data as Guide[] || [];
    } catch (error) {
        console.error('Failed to fetch guides by category:', error);
        throw error;
    }
};

// Sync guides from Supabase to local cache
export const syncGuidesToCache = async (): Promise<boolean> => {
    try {
        console.log('Starting sync from Supabase...');
        const guides = await fetchGuidesFromSupabase();
        await cacheGuides(guides);
        console.log('Sync completed successfully');
        return true;
    } catch (error) {
        console.error('Failed to sync guides:', error);
        return false;
    }
};

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
    return SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
        SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
};
