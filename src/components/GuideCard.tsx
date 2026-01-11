import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Guide } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

interface GuideCardProps {
    guide: Guide;
    onPress: () => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onPress }) => {
    const getCategoryColor = (category: string): string => {
        switch (category) {
            case 'Physical Health':
                return colors.categoryPhysical;
            case 'Mental Health':
                return colors.categoryMental;
            case 'Fitness & Training':
                return colors.categoryFitness;
            case 'Nutrition':
                return colors.categoryNutrition;
            case 'Sleep & Recovery':
                return colors.categorySleep;
            case 'Focus & Productivity':
                return colors.categoryFocus;
            case 'Stress & Anxiety':
                return colors.categoryStress;
            default:
                return colors.primary;
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.content}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(guide.category) }]}>
                    <Text style={styles.categoryText}>{guide.category}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {guide.title}
                </Text>
                <Text style={styles.summary} numberOfLines={2}>
                    {guide.summary}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    content: {
        padding: 20,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: textStyles.caption.fontSize,
        color: colors.textInverse,
        fontWeight: textStyles.label.fontWeight,
    },
    title: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight,
        color: colors.text,
        marginBottom: 8,
        lineHeight: textStyles.h3.fontSize * 1.3,
    },
    summary: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
        lineHeight: textStyles.bodySmall.fontSize * 1.5,
    },
});
