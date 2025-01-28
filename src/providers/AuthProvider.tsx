import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../services/api';
import { RootStackParamList } from '../types/RootType';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type IntendedRoute = { name: keyof RootStackParamList; params?: any };

type AuthContextType = {
    isAuthenticated: boolean;
    login: (data: { email: string; password: string }, navigation: ScreenNavigationProp) => void;
    errorMessage: string | null;
    authToken: string | null;
    loading: boolean;
    user: any | null;
    logout: () => void;
    intendedRoute: IntendedRoute | null;
    setIntendedRoute: (route: IntendedRoute | null) => void; // Fix here
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    errorMessage: null,
    authToken: '',
    loading: true,
    user: null,
    logout: () => {},
    intendedRoute: null,
    setIntendedRoute: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Store user info
    const [intendedRoute, setIntendedRoute] = useState<IntendedRoute | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const authenticateUser = async (data: { email: string; password: string }) => {
        const response = await fetch(`${API_BASE_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        return { success: response.ok, ...res }; // Include both success status and response data
    };

    const handleSuccessfulLogin = async (res: any, navigation: ScreenNavigationProp) => {
        Alert.alert('Login Successful', `Welcome back, ${res.user.email}!`);
        await AsyncStorage.setItem('authToken', res.token);
        setAuthToken(`Bearer ${res.token}`);
        setIsAuthenticated(true);
        setUser(res.user);

        if (intendedRoute) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }, { name: intendedRoute.name, params: intendedRoute.params }],
            });
            setIntendedRoute(null);
        } else {
            navigation.navigate('Home');
        }
    };

    const login = async (data: { email: string; password: string }, navigation: ScreenNavigationProp) => {
        try {
            const res = await authenticateUser(data);

            if (res.success) {
                handleSuccessfulLogin(res, navigation); // Handles success flow
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
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                errorMessage,
                authToken,
                loading,
                user,
                logout,
                intendedRoute,
                setIntendedRoute,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
