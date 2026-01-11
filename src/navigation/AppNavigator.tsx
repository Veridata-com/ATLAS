import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { GuideViewScreen } from '../screens/GuideViewScreen';
import { SavedGuidesScreen } from '../screens/SavedGuidesScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon: React.FC<{ icon: string }> = ({ icon }) => (
    <Text style={{ fontSize: 24 }}>{icon}</Text>
);

// Home stack with GuideView
const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen
            name="GuideView"
            component={GuideViewScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Back',
                headerTintColor: colors.primary,
                headerStyle: { backgroundColor: colors.background },
            }}
        />
    </Stack.Navigator>
);

// Categories stack with GuideView
const CategoriesStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CategoriesMain" component={CategoriesScreen} />
        <Stack.Screen
            name="GuideView"
            component={GuideViewScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Back',
                headerTintColor: colors.primary,
                headerStyle: { backgroundColor: colors.background },
            }}
        />
    </Stack.Navigator>
);

// Saved stack with GuideView
const SavedStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SavedMain" component={SavedGuidesScreen} />
        <Stack.Screen
            name="GuideView"
            component={GuideViewScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Back',
                headerTintColor: colors.primary,
                headerStyle: { backgroundColor: colors.background },
            }}
        />
    </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textLight,
                    tabBarStyle: {
                        backgroundColor: colors.backgroundElevated,
                        borderTopColor: colors.border,
                        borderTopWidth: 1,
                        paddingTop: 8,
                        paddingBottom: 8,
                        height: 60,
                    },
                    tabBarLabelStyle: {
                        fontSize: textStyles.caption.fontSize,
                        fontWeight: textStyles.label.fontWeight as any,
                        marginTop: 4,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => <TabIcon icon="🏠" />,
                    }}
                />
                <Tab.Screen
                    name="Categories"
                    component={CategoriesStack}
                    options={{
                        tabBarLabel: 'Categories',
                        tabBarIcon: () => <TabIcon icon="📚" />,
                    }}
                />
                <Tab.Screen
                    name="Saved"
                    component={SavedStack}
                    options={{
                        tabBarLabel: 'Saved',
                        tabBarIcon: () => <TabIcon icon="🔖" />,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: () => <TabIcon icon="⚙️" />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
