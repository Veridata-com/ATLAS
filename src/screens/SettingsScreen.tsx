import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Alert,
} from 'react-native';
import { getUserTier, setUserTier } from '../services/tierService';
import { UserTier } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

export const SettingsScreen: React.FC = () => {
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        loadUserTier();
    }, []);

    const loadUserTier = async () => {
        const tier = await getUserTier();
        setIsPremium(tier === UserTier.Premium);
    };

    const handleTogglePremium = async (value: boolean) => {
        setIsPremium(value);
        await setUserTier(value ? UserTier.Premium : UserTier.Free);

        Alert.alert(
            'Subscription Updated',
            value
                ? 'You now have Premium access with unlimited searches and saves!'
                : 'You are now on the Free tier (3 searches/day, 5 saved guides max)',
            [{ text: 'OK' }]
        );
    };

    const handleMenuPress = (item: string) => {
        switch (item) {
            case 'Account':
                Alert.alert('Account', 'Account management coming soon');
                break;
            case 'Sources & Methodology':
                Alert.alert(
                    'Sources & Methodology',
                    'Atlas guides are based on peer-reviewed scientific research, meta-analyses, and reputable institutional sources. All citations are provided at the end of each guide.'
                );
                break;
            case 'Feedback':
                Alert.alert('Feedback', 'Send feedback to: feedback@atlas-app.com');
                break;
            case 'About Atlas':
                Alert.alert(
                    'About Atlas',
                    'Atlas v1.0.0\n\nA minimalist, science-backed knowledge library providing calm, trustworthy, evidence-based guidance.\n\nBuilt with trust over engagement.'
                );
                break;
            case 'Privacy':
                Alert.alert(
                    'Privacy',
                    'Your data stays on your device. We do not track, share, or sell your information.'
                );
                break;
            default:
                break;
        }
    };

    const renderSettingItem = (title: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={!onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <Text style={styles.settingTitle}>{title}</Text>
            {rightElement}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.headerTitle}>Settings</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account & Subscription</Text>

                {renderSettingItem('Account', () => handleMenuPress('Account'))}

                {renderSettingItem(
                    'Subscription',
                    undefined,
                    <View style={styles.subscriptionContainer}>
                        <Text style={[styles.tierText, isPremium && styles.premiumText]}>
                            {isPremium ? 'Premium' : 'Free'}
                        </Text>
                        <Switch
                            value={isPremium}
                            onValueChange={handleTogglePremium}
                            trackColor={{ false: colors.border, true: colors.primary }}
                            thumbColor={colors.backgroundElevated}
                        />
                    </View>
                )}

                {!isPremium && (
                    <View style={styles.tierInfo}>
                        <Text style={styles.tierInfoText}>
                            Free tier: 3 searches/day, 5 saved guides
                        </Text>
                    </View>
                )}
                {isPremium && (
                    <View style={styles.tierInfo}>
                        <Text style={styles.tierInfoText}>
                            Premium: Unlimited searches & saves
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Information</Text>

                {renderSettingItem(
                    'Sources & Methodology',
                    () => handleMenuPress('Sources & Methodology')
                )}
                {renderSettingItem('About Atlas', () => handleMenuPress('About Atlas'))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>

                {renderSettingItem('Feedback', () => handleMenuPress('Feedback'))}
                {renderSettingItem('Privacy', () => handleMenuPress('Privacy'))}
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
    headerTitle: {
        fontSize: textStyles.h1.fontSize,
        fontWeight: textStyles.h1.fontWeight,
        color: colors.text,
        marginBottom: 32,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: textStyles.bodySmall.fontSize,
        fontWeight: textStyles.label.fontWeight,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
    },
    settingItem: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    settingTitle: {
        fontSize: textStyles.body.fontSize,
        color: colors.text,
        fontWeight: textStyles.label.fontWeight,
    },
    subscriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tierText: {
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
    },
    premiumText: {
        color: colors.primary,
        fontWeight: textStyles.label.fontWeight,
    },
    tierInfo: {
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    tierInfoText: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
