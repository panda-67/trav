import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuthContext } from '../../providers/AuthProvider';
import { RootStackParamList } from '../../types/RootType';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = ({ navigation }: { navigation: ScreenNavigationProp }) => {
    const { login, errorMessage } = useAuthContext();
    const isDarkMode = useColorScheme() === 'dark';
    const styles: any = myStyles(isDarkMode);

    const onSubmit = async (data: { email: string; password: string }) => {
        login(data, navigation);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '', password: '' },
    });

    if (errorMessage) {
        return (
            <SafeAreaView>
                <Text>{errorMessage}</Text>
                <Button title="Go Back" onPress={() => navigation.popTo('Login')} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to your account</Text>
            </View>

            <View style={styles.form}>
                {/* Email Field */}
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.error]}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                {/* Password Field */}
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.password && styles.error]}
                            placeholder="Password"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                {/* Submit Button */}
                <Button title="Login" onPress={handleSubmit(onSubmit)} />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password recovery link sent!')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Text style={styles.signup} onPress={() => navigation.navigate('Signup')}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const myStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            justifyContent: 'center',
        },
        header: {
            marginBottom: 32,
            alignItems: 'center',
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.lighter : '#333',
        },
        subtitle: {
            fontSize: 16,
            color: '#666',
            marginTop: 8,
        },
        form: {
            marginBottom: 16,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
            fontSize: 16,
            color: isDarkMode ? Colors.white : Colors.black,
        },
        error: {
            borderColor: 'red',
        },
        errorText: {
            color: 'red',
            fontSize: 14,
            marginBottom: 8,
        },
        forgotPassword: {
            color: '#007BFF',
            textAlign: 'center',
            marginTop: 12,
        },
        footer: {
            marginTop: 16,
            alignItems: 'center',
        },
        footerText: {
            fontSize: 14,
            color: '#666',
        },
        signup: {
            color: '#007BFF',
            fontWeight: 'bold',
        },
    });

export default LoginScreen;
