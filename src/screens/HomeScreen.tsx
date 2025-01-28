import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Card, { CardProps } from '../components/Card';
import { fetchData } from '../services/api';
import LogoutButton from './Auth/Logout';
import { useAuthContext } from '../providers/AuthProvider';

interface Data {
    destinies: CardProps[]; // Array of destinies
}

const HomeScreen = () => {
    const [data, setData] = useState<Data>({ destinies: [] });
    const [page, setPage] = useState(1); // Track current page
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false); // Track loading more
    const [hasMoreData, setHasMoreData] = useState(true); // Track last page
    const { isAuthenticated } = useAuthContext();

    const getData = async (currentPage = 1) => {
        try {
            const result = await fetchData(`?page=${currentPage}`); // Append page param if API supports pagination

            setData(prevData => ({
                destinies: [...prevData.destinies, ...result.destinies], // Append new destinies
            }));

            if (currentPage >= result.last_page) {
                setHasMoreData(false); // A new state to track if more data exists
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Trigger data fetching when `page` changes
    useEffect(() => {
        getData(page);
    }, [page]); // Dependency on `page` to fetch new data when page changes

    const loadMoreData = () => {
        if (!loadingMore && hasMoreData) {
            setLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage); // Trigger page change which will trigger the `useEffect`
        }
    };

    const renderFooter = () => {
        if (loadingMore) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }
        return null;
    };

    const renderEmpty = () => {
        if (!loading) {
            return <Text style={styles.emptyText}>No destinies available</Text>;
        }
        if (error) {
            return <Text style={styles.emptyText}>{error}</Text>;
        }
    };

    return (
        <>
            {isAuthenticated && (
                <View style={styles.logOutButton}>
                    <LogoutButton />
                </View>
            )}
            <FlatList
                numColumns={3}
                data={data.destinies}
                renderItem={({ item }) => <Card data={item} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
                ListFooterComponent={renderFooter()} // Show a footer spinner while loading more data
                ListEmptyComponent={renderEmpty()} // Show a message or loader when there's no data
                onEndReached={loadMoreData} // Trigger more data when scrolled to the end
                onEndReachedThreshold={0.5} // Trigger when 50% from the end
                style={styles.flatList}
                columnWrapperStyle={styles.columnWrapper}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        paddingBottom: 60,
    },
    scrollView: {
        paddingHorizontal: 16, // Padding around the scrollable area
    },
    buttonWrapper: {
        marginBottom: 16, // Space between button and other content
        paddingHorizontal: 20, // Padding for button
    },
    loader: {
        marginTop: 20, // Adds spacing before the loader
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    flatList: {
        flex: 1,
        paddingTop: 14,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Adds spacing between columns
        // marginBottom: 16, // Adds spacing between rows
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOutButton: {
        paddingTop: 6,
        paddingHorizontal: 12,
    },
});

export default HomeScreen;
