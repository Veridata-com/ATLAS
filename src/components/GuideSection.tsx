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
        marginBottom: 32,
    },
    title: {
        fontSize: textStyles.h2.fontSize,
        fontWeight: textStyles.h2.fontWeight,
        color: colors.text,
        marginBottom: 16,
    },
    contentContainer: {
        gap: 8,
    },
    text: {
        fontSize: textStyles.body.fontSize,
        lineHeight: textStyles.body.fontSize * textStyles.body.lineHeight,
        color: colors.text,
    },
    textMargin: {
        marginBottom: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 8,
    },
    bullet: {
        fontSize: textStyles.body.fontSize,
        color: colors.primary,
        marginRight: 12,
        fontWeight: textStyles.label.fontWeight,
    },
    bulletText: {
        flex: 1,
        fontSize: textStyles.body.fontSize,
        lineHeight: textStyles.body.fontSize * textStyles.body.lineHeight,
        color: colors.text,
    },
});
