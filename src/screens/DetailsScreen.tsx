import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CardProps } from '../components/Card';
import { useAuthContext } from '../providers/AuthProvider';
import { fetchDetail } from '../services/api';
import { RootStackParamList } from '../types/RootType';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function DetailsScreen({ navigation, route }: { navigation: HomeScreenNavigationProp; route: any }) {
    const [itemDetails, setItemDetails] = useState<CardProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { authToken } = useAuthContext();
    const { itemId } = route.params;

    let imageUrls: string[] = [];

    if (itemDetails?.images) {
        imageUrls = JSON.parse(itemDetails.images);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchDetail(itemId, authToken);
                setItemDetails(result.destination);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [itemId, authToken]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                {/* Title */}
                <Text style={styles.title}>{itemDetails?.title}</Text>

                {/* Images */}
                <View style={styles.imageGallery}>
                    {imageUrls &&
                        imageUrls.map((imageUri, index) => (
                            <Image key={index} source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
                        ))}
                </View>

                {/* Description */}
                <Text style={styles.description}>{itemDetails?.description}</Text>

                {/* Go Back Button */}
                {/* <View style={styles.button}> */}
                {/*     <Button title="Go Back" onPress={() => navigation.popTo('Home')} /> */}
                {/* </View> */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333333',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666666',
        marginBottom: 32,
        textAlign: 'justify',
    },
    imageGallery: {
        marginBottom: 4,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        marginBottom: 32,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default DetailsScreen;
