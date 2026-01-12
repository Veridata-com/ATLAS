import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';
import { Check, X, Target } from 'lucide-react-native';

interface ActionBoxProps {
    whatToDo: string[];
    whatNotToDo?: string[];
}

export const ActionBox: React.FC<ActionBoxProps> = ({ whatToDo, whatNotToDo = [] }) => {
    if (whatToDo.length === 0 && whatNotToDo.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>IF YOU WANT RESULTS:</Text>

            <View style={styles.content}>
                {whatToDo.map((item, index) => (
                    <View key={`do-${index}`} style={styles.itemRow}>
                        <Check size={20} color={colors.success} style={styles.icon} />
                        <Text style={styles.text}>{item}</Text>
                    </View>
                ))}

                {whatNotToDo.map((item, index) => (
                    <View key={`dont-${index}`} style={styles.itemRow}>
                        <X size={20} color={colors.error} style={styles.icon} />
                        <Text style={styles.text}>Avoid: {item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundDark,
        borderRadius: 16,
        padding: 24,
        marginTop: 32,
        marginBottom: 32,
    },
    header: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight as any,
        color: colors.textInverse,
        marginBottom: 20,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    content: {
        gap: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        marginTop: 2,
        marginRight: 12,
    },
    text: {
        flex: 1,
        fontSize: textStyles.bodyLarge.fontSize,
        lineHeight: textStyles.bodyLarge.fontSize * 1.5,
        color: colors.textInverse,
        fontWeight: textStyles.label.fontWeight as any,
    },
});
