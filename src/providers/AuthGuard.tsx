import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../types/RootType';
import { useAuthContext } from './AuthProvider';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AuthGuard = ({ children, navigation }: { children: React.ReactNode; navigation: ScreenNavigationProp }) => {
    const { isAuthenticated, loading } = useAuthContext(); // Auth context state

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigation.navigate('Login');
        }
    }, [loading, isAuthenticated, navigation]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
