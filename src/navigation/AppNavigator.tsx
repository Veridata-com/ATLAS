import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search, BookOpen, LayoutGrid, Settings } from 'lucide-react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { GuideViewScreen } from '../screens/GuideViewScreen';
import { SavedGuidesScreen } from '../screens/SavedGuidesScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../styles/colors';
import { textStyles } from '../styles/typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Cast to any to avoid React 19 type errors with Navigation 7
const StackNavigator = Stack.Navigator as any;
const TabNavigatorComponent = Tab.Navigator as any;
const RootNavigator = RootStack.Navigator as any;

// Home stack (Now Search) behavior
const HomeStack = () => (
    <StackNavigator screenOptions={{ headerShown: false }}>
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
    </StackNavigator>
);

// Categories stack
const CategoriesStack = () => (
    <StackNavigator screenOptions={{ headerShown: false }}>
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
    </StackNavigator>
);

// Saved stack (Now My Guides)
const SavedStack = () => (
    <StackNavigator screenOptions={{ headerShown: false }}>
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
    </StackNavigator>
);

const TabNavigator = () => {
    return (
        <TabNavigatorComponent
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight, // More subtle inactive color
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
                name="Saved"
                component={SavedStack}
                options={{
                    tabBarLabel: 'My Guides',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => <BookOpen size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => <Search size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesStack}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => <LayoutGrid size={size} color={color} />,
                }}
            />
        </TabNavigatorComponent>
    );
};

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <RootNavigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="MainTabs" component={TabNavigator} />
                <RootStack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Settings',
                        headerBackTitle: 'Back',
                        headerTintColor: colors.primary,
                        headerStyle: { backgroundColor: colors.background },
                    }}
                />
            </RootNavigator>
        </NavigationContainer>
    );
};
