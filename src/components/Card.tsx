import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types/RootType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const Card = ({ data }: { data: CardProps }) => {
    const navigation = useNavigation<DetailsScreenNavigationProp>();

    let imageUrls: string[] = [];

    if (data.images) {
        imageUrls = JSON.parse(data.images);
    }

    const goToDetail = (id: any) => {
        navigation.push('Details', { itemId: id });
    };

    return (
        <View style={styles.cardContainer}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0] }}
                    accessibilityLabel={data.title}
                    style={styles.image}
                />
            </View>

            {/* Text Content Section */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{data.title}</Text>

                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
                    {data.description}
                </Text>

                {/* Link Section */}
                <TouchableOpacity style={styles.learnMoreButton} onPress={() => goToDetail(data.uuid)}>
                    <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export interface CardProps {
    uuid: string;
    title: string;
    description?: string;
    images?: string;
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 16,
        marginHorizontal: 12,
    },
    imageContainer: {
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        overflow: 'hidden',
    },
    image: {
        height: 192,
        width: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        fontWeight: '300',
        marginBottom: 12,
    },
    learnMoreButton: {
        marginTop: 6,
        backgroundColor: '#4c6ef5', // Indigo color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
        alignSelf: 'flex-start', // Align to the left
    },
    learnMoreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Card;
