import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HistoryScreen from '../screens/HistoryScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import DiceScreen from '../screens/DiceScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name="TabOne"
                component={DiceScreen}
                options={{
                    title: 'Dice',
                    tabBarIcon: ({ color }) => <TabBarIcon name="random" color={color} />,
                }}
            />

            <BottomTab.Screen
                name="TabTwo"
                component={HistoryScreen}
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
                }}
            />

            <BottomTab.Screen
                name="TabThree"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
