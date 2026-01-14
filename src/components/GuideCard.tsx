import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pin } from 'lucide-react-native';
import { Guide } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

interface GuideCardProps {
    guide: Guide;
    onPress: () => void;
    onTogglePin?: () => void;
    isPinned?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onPress, onTogglePin, isPinned = false }) => {
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
    const evidenceLevel = guide.evidenceLevel || 'High'; // Default to High as per PRD "Science-backed"

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    {/* Title: Semibold, 18px */}
                    <Text style={styles.title} numberOfLines={2}>
                        {guide.title}
                    </Text>
                    {onTogglePin && (
                        <TouchableOpacity onPress={onTogglePin} style={styles.pinButton}>
                            <Pin
                                size={18}
                                color={isPinned ? colors.primary : colors.textSecondary}
                                fill={isPinned ? colors.primary : 'transparent'}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Snippet: 2-line max */}
                <Text style={styles.summary} numberOfLines={2}>
                    {guide.summary}
                </Text>

                {/* Meta Row: 12px muted */}
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>Est. {readTime} min</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{evidenceLevel} Evidence</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{guide.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 8,
        marginBottom: 16,
        paddingVertical: 8, // Slightly increased vertical padding
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    title: {
        flex: 1, // Allow title to take up text space
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        lineHeight: 24,
        marginRight: 8, // Space for pin
    },
    pinButton: {
        padding: 4,
        marginTop: -4, // Optical alignment
    },
    summary: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary, // Muted
        marginBottom: 10,
        lineHeight: textStyles.bodySmall.fontSize * 1.5,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Handle overflow gracefully
    },
    metaText: {
        fontSize: 12, // Explicit 12px request
        color: colors.textSecondary, // Muted
        fontWeight: '400',
    },
    metaDot: {
        fontSize: 12,
        color: colors.textSecondary,
        marginHorizontal: 6,
    },
});
