import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pin, ChevronRight } from 'lucide-react-native';
import { Guide } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

interface CompactGuideCardProps {
    guide: Guide;
    onPress: () => void;
    onUnpin: () => void;
}

export const CompactGuideCard: React.FC<CompactGuideCardProps> = ({ guide, onPress, onUnpin }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.leftContent}>
                <TouchableOpacity onPress={onUnpin} style={styles.pinButton}>
                    <Pin size={16} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={1}>
                    {guide.title}
                </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.backgroundElevated,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pinButton: {
        marginRight: 12,
        padding: 4,
    },
    title: {
        fontSize: textStyles.body.fontSize, // Compact but readable
        fontWeight: '600',
        color: colors.text,
        flex: 1,
        marginRight: 8,
    },
});
