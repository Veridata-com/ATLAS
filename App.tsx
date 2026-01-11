import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initDatabase } from './src/data/database';
import { syncGuidesToCache, isSupabaseConfigured } from './src/services/supabaseService';
import { colors } from './src/styles/colors';
import { textStyles } from './src/styles/typography';

export default function App() {
    const [isInitializing, setIsInitializing] = useState(true);
    const [initError, setInitError] = useState<string | null>(null);

    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            console.log('Initializing database...');
            await initDatabase();

            if (isSupabaseConfigured()) {
                console.log('Syncing guides from Supabase...');
                const syncSuccess = await syncGuidesToCache();

                if (!syncSuccess) {
                    console.warn('Failed to sync from Supabase, but app will continue');
                }
            } else {
                console.warn('Supabase not configured');
                setInitError('Supabase not configured. Please configure your database connection.');
            }

            setIsInitializing(false);
        } catch (error) {
            console.error('Failed to initialize app:', error);
            setInitError('Failed to initialize app. Please restart.');
            setIsInitializing(false);
        }
    };

    if (isInitializing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading Atlas...</Text>
                <Text style={styles.loadingSubtext}>Syncing guides from Supabase</Text>
            </View>
        );
    }

    if (initError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>⚠️ Setup Required</Text>
                <Text style={styles.errorText}>{initError}</Text>
                <Text style={styles.errorHint}>
                    Configure your Supabase credentials in:{'\n'}
                    src/services/supabaseService.ts
                </Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar style="dark" />
            <AppNavigator />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 20,
        fontSize: textStyles.h3.fontSize,
        fontWeight: textStyles.h3.fontWeight as any,
        color: colors.text,
    },
    loadingSubtext: {
        marginTop: 8,
        fontSize: textStyles.body.fontSize,
        color: colors.textSecondary,
    },
    errorContainer: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    errorTitle: {
        fontSize: textStyles.h1.fontSize,
        fontWeight: textStyles.h1.fontWeight as any,
        color: colors.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    errorText: {
        fontSize: textStyles.body.fontSize,
        color: colors.error,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: textStyles.body.fontSize * 1.5,
    },
    errorHint: {
        fontSize: textStyles.bodySmall.fontSize,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: textStyles.bodySmall.fontSize * 1.5,
    },
});
