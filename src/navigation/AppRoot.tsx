import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppRoot() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
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
                }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Destinations' }} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
