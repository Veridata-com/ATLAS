import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GuideSection } from '../components/GuideSection';
import { ActionBox } from '../components/ActionBox';
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
            <View style={styles.header}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{guide.category}</Text>
                </View>
                <Text style={styles.title}>{guide.title}</Text>
                {guide.whoThisIsFor && (
                    <Text style={styles.whoThisIsFor}>For: {guide.whoThisIsFor}</Text>
                )}
            </View>

            {/* Outcome Card */}
            <View style={styles.outcomeCard}>
                <Text style={styles.outcomeTitle}>What you'll gain</Text>
                <Text style={styles.outcomeText}>{guide.summary}</Text>
            </View>

            {/* Content Sections */}
            {guide.whatScienceSays.length > 0 && (
                <GuideSection
                    title="What Science Says"
                    content={guide.whatScienceSays}
                />
            )}

            {/* Action Box */}
            <ActionBox
                whatToDo={guide.whatToDo}
                whatNotToDo={guide.whatNotToDo}
            />

            {/* Sources */}
            {guide.sources.length > 0 && (
                <View style={styles.sourcesContainer}>
                    <Text style={styles.sourcesTitle}>Sources</Text>
                    {guide.sources.map((source, index) => (
                        <Text key={index} style={styles.sourceText}>
                            {index + 1}. {source}
                        </Text>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={[styles.saveButton, isSaved && styles.savedButton]}
                onPress={handleSaveToggle}
                disabled={isSaving}
                activeOpacity={0.8}
            >
                <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
                    {isSaving ? 'Saving...' : isSaved ? 'Saved to My Guides' : 'Save Guide'}
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
    header: {
        marginBottom: 24,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.backgroundElevated,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    categoryText: {
        fontSize: textStyles.caption.fontSize,
        color: colors.textSecondary,
        fontWeight: textStyles.label.fontWeight as any,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: textStyles.display.fontSize,
        fontWeight: textStyles.display.fontWeight as any,
        color: colors.text,
        marginBottom: 8,
        lineHeight: textStyles.display.lineHeight * textStyles.display.fontSize,
    },
    whoThisIsFor: {
        fontSize: textStyles.bodyLarge.fontSize,
        color: colors.textSecondary,
        marginTop: 4,
        fontStyle: 'italic',
    },
    outcomeCard: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
    },
    outcomeTitle: {
        fontSize: textStyles.label.fontSize,
        fontWeight: textStyles.label.fontWeight as any,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    outcomeText: {
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight as any,
        color: colors.textInverse,
        lineHeight: textStyles.h3.fontSize * 1.4,
    },
    sourcesContainer: {
        marginTop: 16,
        marginBottom: 32,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    sourcesTitle: {
        fontSize: textStyles.label.fontSize,
        fontWeight: textStyles.label.fontWeight as any,
        color: colors.textSecondary,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    sourceText: {
        fontSize: textStyles.caption.fontSize,
        color: colors.textSecondary,
        marginBottom: 4,
        lineHeight: textStyles.caption.fontSize * 1.5,
    },
    saveButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 40,
    },
    savedButton: {
        backgroundColor: colors.backgroundElevated,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    saveButtonText: {
        color: colors.textInverse,
        fontSize: textStyles.button.fontSize,
        fontWeight: textStyles.button.fontWeight as any,
    },
    savedButtonText: {
        color: colors.primary,
    },
});
