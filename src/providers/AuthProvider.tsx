import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../services/api';
import { RootStackParamList } from '../types/RootType';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AuthContextType = {
    isAuthenticated: boolean;
    login: (data: { email: string; password: string }, navigation: ScreenNavigationProp) => void;
    errorMessage: string | null;
    loading: boolean;
    user: any | null;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    errorMessage: null,
    loading: true,
    user: null,
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Store user info

    useEffect(() => {
        // Simulate checking auth state (e.g., token validation)
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (data: { email: string; password: string }, navigation: ScreenNavigationProp) => {
        try {
            const response = await fetch(`${API_BASE_URL}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });

            const res = await response.json();

            if (response.ok) {
                Alert.alert('Login Successful', `Welcome back, ${data.email}!`);
                await AsyncStorage.setItem('authToken', res.token); // Save token
                navigation.navigate('Home'); // Navigate to Home Screen
                setIsAuthenticated(true); // Update auth state
                setErrorMessage(null); // Clear error messages
                setUser(res.user); // Store user data in state
            } else {
                setErrorMessage(`${res.message}. Login failed, please try again.`);
            }
        } catch (error) {
            setErrorMessage('Network error, please try again later.');
            console.error(error);
        }
    };

    const logout = async () => {
        if (isAuthenticated) {
            await AsyncStorage.removeItem('authToken').finally(() => {
                Alert.alert('Log Out', 'Logged Out Successful!');
                setIsAuthenticated(false); // Update auth state
                setUser(null); // Clear user data
            });
        } else {
            Alert.alert('Info', 'Already Logged Out.');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, errorMessage, loading, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
