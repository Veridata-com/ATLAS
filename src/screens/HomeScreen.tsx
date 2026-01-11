import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../components/SearchBar';
import { GuideCard } from '../components/GuideCard';
import { Guide, SearchResult } from '../data/types';
import { getCachedGuides } from '../data/database';
import { searchGuides, getPopularGuides, getRecentlyAddedGuides } from '../services/searchService';
import { getAllSavedGuides } from '../services/storageService';
import { canPerformSearch, incrementSearchCount } from '../services/tierService';
import { syncGuidesToCache } from '../services/supabaseService';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [popularGuides, setPopularGuides] = useState<Guide[]>([]);
    const [recentGuides, setRecentGuides] = useState<Guide[]>([]);
    const [savedGuides, setSavedGuides] = useState<Guide[]>([]);
    const [allGuides, setAllGuides] = useState<Guide[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadSavedGuides();
        }, [])
    );

    const loadData = async () => {
        try {
            const guides = await getCachedGuides();
            setAllGuides(guides);
            setPopularGuides(getPopularGuides(guides));
            setRecentGuides(getRecentlyAddedGuides(guides));
            await loadSavedGuides();
        } catch (error) {
            console.error('Failed to load guides:', error);
            if (Platform.OS === 'web') {
                alert('Failed to load guides');
            } else {
                Alert.alert('Error', 'Failed to load guides');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const loadSavedGuides = async () => {
        const saved = await getAllSavedGuides();
        setSavedGuides(saved.slice(0, 3));
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await syncGuidesToCache();
            await loadData();
        } catch (error) {
            if (Platform.OS === 'web') {
                alert('Could not sync guides from server');
            } else {
                Alert.alert('Sync Failed', 'Could not sync guides from server');
            }
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);

        if (!query || query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        const { canSearch } = await canPerformSearch();

        if (!canSearch) {
            const message = "You've used all your searches today. Upgrade to Premium for unlimited searches.";
            if (Platform.OS === 'web') {
                alert(message);
            } else {
                Alert.alert('Search Limit Reached', message);
            }
            setSearchQuery('');
            return;
        }

        const results = searchGuides(allGuides, query);
        setSearchResults(results);
        await incrementSearchCount();
    };

    const handleGuidePress = (guide: Guide) => {
        navigation.navigate('GuideView', { guideId: guide.id });
    };

    const renderSection = (title: string, guides: Guide[]) => {
        if (guides.length === 0) return null;

        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {guides.map((guide) => (
                    <GuideCard key={guide.id} guide={guide} onPress={() => handleGuidePress(guide)} />
                ))}
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading guides...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
            }
        >
            <Text style={styles.header}>Atlas</Text>
            <SearchBar onSearch={handleSearch} value={searchQuery} />

            {searchQuery && searchResults.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Search Results</Text>
                    {searchResults.map((result) => (
                        <GuideCard key={result.guide.id} guide={result.guide} onPress={() => handleGuidePress(result.guide)} />
                    ))}
                </View>
            )}

            {searchQuery && searchResults.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No guides found for "{searchQuery}"</Text>
                </View>
            )}

            {!searchQuery && (
                <>
                    {renderSection('Popular right now', popularGuides)}
                    {renderSection('Recently added', recentGuides)}
                    {renderSection('Saved guides', savedGuides)}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        marginTop: 16,
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
    },
    header: {
        fontSize: textStyles.h1.fontSize,
        fontWeight: textStyles.h1.fontWeight as any,
        color: colors.text,
        marginBottom: 32,
        textAlign: 'center',
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight as any,
        color: colors.text,
        marginBottom: 16,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
