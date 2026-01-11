import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoryTile } from '../components/CategoryTile';
import { GuideCard } from '../components/GuideCard';
import { Category, Guide } from '../data/types';
import { getCachedGuides } from '../data/database';
import { filterGuidesByCategory } from '../services/searchService';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

// All 7 categories exactly as specified
const CATEGORIES: Category[] = [
    Category.PhysicalHealth,
    Category.MentalHealth,
    Category.FitnessTraining,
    Category.Nutrition,
    Category.SleepRecovery,
    Category.FocusProductivity,
    Category.StressAnxiety,
];

export const CategoriesScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [allGuides, setAllGuides] = useState<Guide[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadGuides();
    }, []);

    const loadGuides = async () => {
        try {
            const guides = await getCachedGuides();
            setAllGuides(guides);
        } catch (error) {
            console.error('Failed to load guides:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getGuidesCountForCategory = (category: Category): number => {
        return allGuides.filter((guide) => guide.category === category).length;
    };

    const handleCategoryPress = (category: Category) => {
        const guides = filterGuidesByCategory(allGuides, category);
        setSelectedCategory(category);
        setFilteredGuides(guides);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setFilteredGuides([]);
    };

    const handleGuidePress = (guide: Guide) => {
        navigation.navigate('GuideView', { guideId: guide.id });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (selectedCategory) {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{selectedCategory}</Text>
                    <Text
                        style={styles.backButton}
                        onPress={handleBackToCategories}
                    >
                        ← Back to Categories
                    </Text>
                </View>

                {filteredGuides.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No guides in this category yet</Text>
                    </View>
                ) : (
                    filteredGuides.map((guide) => (
                        <GuideCard
                            key={guide.id}
                            guide={guide}
                            onPress={() => handleGuidePress(guide)}
                        />
                    ))
                )}
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.headerTitle}>Categories</Text>
            <Text style={styles.subtitle}>
                Browse guides by topic
            </Text>

            <View style={styles.categoriesContainer}>
                {CATEGORIES.map((category) => (
                    <CategoryTile
                        key={category}
                        category={category}
                        guideCount={getGuidesCountForCategory(category)}
                        onPress={() => handleCategoryPress(category)}
                    />
                ))}
            </View>
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
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: textStyles.h1.fontSize,
        fontWeight: textStyles.h1.fontWeight,
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    backButton: {
        fontSize: textStyles.body.fontSize,
        color: colors.primary,
        fontWeight: textStyles.label.fontWeight,
        marginTop: 8,
    },
    categoriesContainer: {
        gap: 0,
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
