import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthGuard from '../providers/AuthGuard';
import LoginScreen from '../screens/Auth/Login';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                },
                headerTintColor: isDarkMode ? Colors.white : Colors.black,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {},
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Destinations' }} />
            <Stack.Screen name="Details">
                {props => (
                    <AuthGuard navigation={props.navigation}>
                        <DetailsScreen {...props} />
                    </AuthGuard>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default function AppRoot() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <Navigation />
        </NavigationContainer>
    );
}
