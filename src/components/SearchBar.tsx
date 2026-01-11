import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';
import { getRemainingSearches, isPremiumUser } from '../services/tierService';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'What do you want to understand or improve?',
    onSearch,
    value = '',
}) => {
    const [searchText, setSearchText] = useState(value);
    const [remainingSearches, setRemainingSearches] = useState<number | null>(null);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        loadSearchInfo();
    }, []);

    const loadSearchInfo = async () => {
        const premium = await isPremiumUser();
        setIsPremium(premium);

        if (!premium) {
            const remaining = await getRemainingSearches();
            setRemainingSearches(remaining);
        }
    };

    const handleChangeText = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.textLight}
                value={searchText}
                onChangeText={handleChangeText}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
            />
            {!isPremium && remainingSearches !== null && (
                <Text style={styles.searchCounter}>
                    {remainingSearches} {remainingSearches === 1 ? 'search' : 'searches'} remaining today
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 24,
    },
    input: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: textStyles.bodyLarge.fontSize,
        fontWeight: textStyles.bodyLarge.fontWeight,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchCounter: {
        marginTop: 8,
        fontSize: textStyles.caption.fontSize,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
