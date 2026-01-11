import Fuse from 'fuse.js';
import { Guide, SearchResult } from '../data/types';

// Configure Fuse.js for fuzzy search with weighted fields
const fuseOptions = {
    keys: [
        { name: 'title', weight: 0.6 }, // Highest priority
        { name: 'tags', weight: 0.3 },  // Medium priority
        { name: 'summary', weight: 0.05 },
        { name: 'whatScienceSays', weight: 0.025 },
        { name: 'whatToDo', weight: 0.025 }, // Lowest priority for body text
    ],
    threshold: 0.4, // Controls fuzziness (0 = exact match, 1 = match anything)
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true, // Search entire string
};

// Perform fuzzy search on cached guides
export const searchGuides = (guides: Guide[], query: string): SearchResult[] => {
    if (!query || query.trim().length === 0) {
        return [];
    }

    // Initialize Fuse with current guides
    const fuse = new Fuse(guides, fuseOptions);

    // Perform search
    const results = fuse.search(query.trim());

    // Transform results to SearchResult format
    const searchResults: SearchResult[] = results.map((result) => ({
        guide: result.item,
        score: 1 - (result.score || 0), // Invert score (higher is better)
    }));

    // Sort by relevance (highest score first)
    return searchResults.sort((a, b) => b.score - a.score);
};

// Get popular guides (most frequently accessed)
// For MVP, we'll return the first 10 guides from each category
export const getPopularGuides = (guides: Guide[]): Guide[] => {
    // In a real app, this would track access counts
    // For MVP, return a diverse selection across categories
    return guides.slice(0, 10);
};

// Get recently added guides
export const getRecentlyAddedGuides = (guides: Guide[]): Guide[] => {
    // Already sorted by createdAt DESC from database
    return guides.slice(0, 10);
};

// Filter guides by category
export const filterGuidesByCategory = (guides: Guide[], category: string): Guide[] => {
    return guides.filter((guide) => guide.category === category);
};

// Get guide recommendations based on tags (for future enhancement)
export const getRelatedGuides = (currentGuide: Guide, allGuides: Guide[], limit: number = 3): Guide[] => {
    // Find guides with similar tags
    const relatedGuides = allGuides
        .filter((guide) => guide.id !== currentGuide.id) // Exclude current guide
        .map((guide) => {
            // Calculate tag overlap
            const commonTags = guide.tags.filter((tag) => currentGuide.tags.includes(tag));
            return {
                guide,
                relevance: commonTags.length,
            };
        })
        .filter((item) => item.relevance > 0) // Only guides with at least one common tag
        .sort((a, b) => b.relevance - a.relevance) // Sort by most relevant
        .slice(0, limit);

    return relatedGuides.map((item) => item.guide);
};
