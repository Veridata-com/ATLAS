import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

interface CategoryTileProps {
    category: Category;
    guideCount: number;
    onPress: () => void;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
    category,
    guideCount,
    onPress,
}) => {
    const getCategoryColor = (cat: Category): string => {
        switch (cat) {
            case Category.PhysicalHealth:
                return colors.categoryPhysical;
            case Category.MentalHealth:
                return colors.categoryMental;
            case Category.FitnessTraining:
                return colors.categoryFitness;
            case Category.Nutrition:
                return colors.categoryNutrition;
            case Category.SleepRecovery:
                return colors.categorySleep;
            case Category.FocusProductivity:
                return colors.categoryFocus;
            case Category.StressAnxiety:
                return colors.categoryStress;
            default:
                return colors.primary;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.tile, { borderLeftColor: getCategoryColor(category) }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.categoryName}>{category}</Text>
            <Text style={styles.guideCount}>
                {guideCount} {guideCount === 1 ? 'guide' : 'guides'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    categoryName: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight,
        color: colors.text,
        marginBottom: 4,
    },
    guideCount: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
    },
});
