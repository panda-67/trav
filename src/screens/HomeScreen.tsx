import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, View, useColorScheme } from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../types/RootType';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <View
                    style={[
                        {
                            backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        },
                    ]}>
                    <Button title="Go to Details" onPress={() => navigation.push('Details', { itemId: 40 })} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
