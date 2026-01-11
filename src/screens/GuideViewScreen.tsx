import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GuideSection } from '../components/GuideSection';
import { Guide } from '../data/types';
import { getCachedGuideById } from '../data/database';
import { saveGuide, unsaveGuide, checkIfGuideSaved } from '../services/storageService';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

export const GuideViewScreen: React.FC = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { guideId } = route.params;

    const [guide, setGuide] = useState<Guide | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadGuide();
    }, [guideId]);

    const loadGuide = async () => {
        try {
            const loadedGuide = await getCachedGuideById(guideId);
            if (loadedGuide) {
                setGuide(loadedGuide);
                const saved = await checkIfGuideSaved(guideId);
                setIsSaved(saved);
            } else {
                const message = 'Guide not found';
                if (Platform.OS === 'web') {
                    alert(message);
                } else {
                    Alert.alert('Error', message);
                }
                navigation.goBack();
            }
        } catch (error) {
            console.error('Failed to load guide:', error);
            if (Platform.OS === 'web') {
                alert('Failed to load guide');
            } else {
                Alert.alert('Error', 'Failed to load guide');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveToggle = async () => {
        if (isSaving || !guide) return;

        setIsSaving(true);
        try {
            if (isSaved) {
                const result = await unsaveGuide(guide.id);
                if (result.success) {
                    setIsSaved(false);
                } else {
                    const message = result.error || 'Failed to remove guide';
                    if (Platform.OS === 'web') {
                        alert(message);
                    } else {
                        Alert.alert('Error', message);
                    }
                }
            } else {
                const result = await saveGuide(guide.id);
                if (result.success) {
                    setIsSaved(true);
                } else {
                    const message = result.error || 'Failed to save guide';
                    if (Platform.OS === 'web') {
                        alert(message);
                    } else {
                        Alert.alert('Save Limit Reached', message);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to toggle save:', error);
            if (Platform.OS === 'web') {
                alert('An error occurred');
            } else {
                Alert.alert('Error', 'An error occurred');
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!guide) {
        return null;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>{guide.title}</Text>
            <Text style={styles.summary}>{guide.summary}</Text>

            <GuideSection title="What science says" content={guide.whatScienceSays} isBulletList={true} />
            <GuideSection title="What to do" content={guide.whatToDo} isBulletList={true} />
            <GuideSection title="Who this is for" content={guide.whoThisIsFor} isBulletList={false} />
            <GuideSection title="What NOT to do" content={guide.whatNotToDo} isBulletList={true} />

            <View style={styles.sourcesSection}>
                <Text style={styles.sourcesTitle}>Sources</Text>
                {guide.sources.map((source, index) => (
                    <Text key={index} style={styles.sourceText}>
                        {index + 1}. {source}
                    </Text>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.saveButton, isSaved && styles.savedButton]}
                onPress={handleSaveToggle}
                disabled={isSaving}
                activeOpacity={0.8}
            >
                <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
                    {isSaving ? 'Saving...' : isSaved ? 'Saved ✓' : 'Save guide'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 24,
        paddingTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    title: {
        fontSize: textStyles.display.fontSize,
        fontWeight: textStyles.display.fontWeight as any,
        lineHeight: textStyles.display.fontSize * 1.2,
        color: colors.text,
        marginBottom: 16,
    },
    summary: {
        fontSize: textStyles.bodyLarge.fontSize,
        lineHeight: textStyles.bodyLarge.fontSize * 1.6,
        color: colors.textSecondary,
        marginBottom: 32,
        fontStyle: 'italic',
    },
    sourcesSection: {
        marginBottom: 32,
    },
    sourcesTitle: {
        fontSize: textStyles.h2.fontSize,
        fontWeight: textStyles.h2.fontWeight as any,
        color: colors.text,
        marginBottom: 16,
    },
    sourceText: {
        fontSize: textStyles.bodySmall.fontSize,
        lineHeight: textStyles.bodySmall.fontSize * 1.6,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginBottom: 40,
    },
    savedButton: {
        backgroundColor: colors.success,
    },
    saveButtonText: {
        fontSize: textStyles.button.fontSize,
        fontWeight: textStyles.button.fontWeight as any,
        color: colors.textInverse,
    },
    savedButtonText: {
        color: colors.textInverse,
    },
});
