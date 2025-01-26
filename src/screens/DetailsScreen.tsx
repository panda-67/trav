import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../types/RootType';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<{ navigation: DetailsScreenNavigationProp }> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Details Screen</Text>
            <Button title="Go Back" onPress={() => navigation.popTo('Home')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DetailsScreen;
