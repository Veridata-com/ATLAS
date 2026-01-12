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
    const calculateReadTime = (guide: Guide): number => {
        // Estimate read time: ~200 words per minute
        const words = (
            guide.summary +
            guide.whatScienceSays.join(' ') +
            guide.whatToDo.join(' ') +
            (guide.whoThisIsFor || '')
        ).split(/\s+/).length;

        return Math.max(1, Math.ceil(words / 200));
    };

    const readTime = calculateReadTime(guide);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {guide.title}
                </Text>

                <Text style={styles.summary} numberOfLines={1}>
                    {guide.summary}
                </Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{guide.category}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{readTime} min</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>Science-backed</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 8, // Less rounded to look more like a "result"
        marginBottom: 16,
        paddingVertical: 4,
        // No heavy borders, maybe just a bottom border or shadow if needed, 
        // but PRD implies clean results. keeping subtle border for contrast.
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    content: {
        padding: 16,
    },
    // Removed old categoryBadge styles
    title: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: 'bold', // Google results are bold
        color: colors.primary, // Or standard blue-ish if following Google exactly, but sticking to brand.
        marginBottom: 4,
        lineHeight: textStyles.h3.fontSize * 1.3,
    },
    summary: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
        marginBottom: 8,
        lineHeight: textStyles.bodySmall.fontSize * 1.5,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: textStyles.caption.fontSize,
        color: colors.textSecondary,
        fontWeight: textStyles.label.fontWeight as any,
    },
    metaDot: {
        fontSize: textStyles.caption.fontSize,
        color: colors.textSecondary,
        marginHorizontal: 6,
    },
});
