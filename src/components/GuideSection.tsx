import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

interface GuideSectionProps {
    title: string;
    content: string[] | string;
    isBulletList?: boolean;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
    title,
    content,
    isBulletList = true,
}) => {
    const renderContent = () => {
        if (typeof content === 'string') {
            return <Text style={styles.text}>{content}</Text>;
        }

        if (isBulletList) {
            return content.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                </View>
            ));
        }

        return content.map((item, index) => (
            <Text key={index} style={[styles.text, index < content.length - 1 && styles.textMargin]}>
                {item}
            </Text>
        ));
    };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        backgroundColor: colors.backgroundElevated,
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.border,
    },
    title: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight as any,
        color: colors.text,
        marginBottom: 16,
    },
    contentContainer: {
        gap: 12,
    },
    text: {
        fontSize: textStyles.body.fontSize,
        lineHeight: textStyles.body.fontSize * 1.6,
        color: colors.text,
    },
    textMargin: {
        marginBottom: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingRight: 8,
    },
    bullet: {
        fontSize: textStyles.body.fontSize,
        color: colors.primary,
        marginRight: 12,
        fontWeight: textStyles.label.fontWeight as any,
    },
    bulletText: {
        flex: 1,
        fontSize: textStyles.body.fontSize,
        lineHeight: textStyles.body.fontSize * 1.6,
        color: colors.text,
    },
});
