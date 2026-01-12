import React, { useState } from 'react';
import { Settings } from 'lucide-react-native';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GuideCard } from '../components/GuideCard';
import { Guide } from '../data/types';
import { getAllSavedGuides, unsaveGuide } from '../services/storageService';
import { canSaveGuide, getUserTier } from '../services/tierService';
import { UserTier } from '../data/types';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

export const SavedGuidesScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [savedGuides, setSavedGuides] = useState<Guide[]>([]);
    const [userTier, setUserTier] = useState<UserTier>(UserTier.Free);
    const [remainingSlots, setRemainingSlots] = useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            loadSavedGuides();
        }, [])
    );

    const loadSavedGuides = async () => {
        const guides = await getAllSavedGuides();
        setSavedGuides(guides);

        const tier = await getUserTier();
        setUserTier(tier);

        if (tier === UserTier.Free) {
            const { remainingSlots: slots } = await canSaveGuide(guides.length);
            setRemainingSlots(typeof slots === 'number' ? slots : 0);
        }
    };

    const handleRemoveGuide = (guideId: string, guideTitle: string) => {
        const message = `Remove "${guideTitle}" from saved guides?`;

        if (Platform.OS === 'web') {
            if (confirm(message)) {
                performRemove(guideId);
            }
        } else {
            Alert.alert('Remove Guide', message, [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => performRemove(guideId),
                },
            ]);
        }
    };

    const performRemove = async (guideId: string) => {
        const result = await unsaveGuide(guideId);
        if (result.success) {
            await loadSavedGuides();
        } else {
            if (Platform.OS === 'web') {
                alert('Failed to remove guide');
            } else {
                Alert.alert('Error', 'Failed to remove guide');
            }
        }
    };

    const handleGuidePress = (guide: Guide) => {
        navigation.navigate('GuideView', { guideId: guide.id });
    };

    const renderGuideItem = ({ item }: { item: Guide }) => (
        <View style={styles.guideItem}>
            <View style={styles.guideCardContainer}>
                <GuideCard guide={item} onPress={() => handleGuidePress(item)} />
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveGuide(item.id, item.title)}
                activeOpacity={0.7}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No saved guides yet</Text>
            <Text style={styles.emptyText}>Save guides to access them offline and keep them handy.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Saved Guides</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Settings color={colors.text} size={24} />
                    </TouchableOpacity>
                </View>
                {userTier === UserTier.Free && (
                    <Text style={styles.limitText}>
                        {savedGuides.length} / 5 guides saved ({remainingSlots} remaining)
                    </Text>
                )}
            </View>

            <FlatList
                data={savedGuides}
                renderItem={renderGuideItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[styles.list, savedGuides.length === 0 && styles.emptyList]}
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: colors.background,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: textStyles.h1.fontSize,
        fontWeight: textStyles.h1.fontWeight as any,
        color: colors.text,
        marginBottom: 8,
    },
    limitText: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
    },
    list: {
        padding: 20,
        paddingTop: 0,
    },
    emptyList: {
        flexGrow: 1,
    },
    guideItem: {
        marginBottom: 8,
    },
    guideCardContainer: {
        marginBottom: 8,
    },
    removeButton: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    removeButtonText: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.error,
        fontWeight: textStyles.label.fontWeight as any,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: textStyles.h2.fontSize,
        fontWeight: textStyles.h2.fontWeight as any,
        color: colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: textStyles.body.fontSize * 1.5,
    },
});
