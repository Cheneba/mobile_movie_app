import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    fetchMovies,
    formatRating,
    getGenreNames,
    getImageUrl,
    Movie,
} from '@/services/api';
import useFetch from '@/services/useFetch';

const { width } = Dimensions.get('window');

const MovieCard = ({ movie, index }: { movie: Movie; index: number }) => {
    const genreNames = getGenreNames(movie.genre_ids);
    const genreText = genreNames.length > 0 ? `${genreNames[0]} • Movie` : 'Movie';

    return (
        <TouchableOpacity
            style={styles.movieCard}
            onPress={() => router.push(`/movies/${movie.id}`)}
            activeOpacity={0.7}
        >
            <View style={styles.movieImageContainer}>
                <Image
                    source={{ uri: getImageUrl(movie.poster_path) }}
                    style={styles.movieImage}
                />
                {index < 10 && (
                    <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>{index + 1}</Text>
                    </View>
                )}
            </View>
            <Text style={styles.movieTitle} numberOfLines={1}>
                {movie.title}
            </Text>
            <View style={styles.movieRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.movieRatingText}>{formatRating(movie.vote_average)}</Text>
            </View>
            <Text style={styles.movieGenre}>{genreText}</Text>
        </TouchableOpacity>
    );
};

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movies,
        loading,
        error,
        refetch,
        reset,
    } = useFetch<Movie[]>(() => fetchMovies({ query: searchQuery }), false);

    // Fetch initial popular movies
    useEffect(() => {
        refetch();
    }, []);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            refetch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleClearSearch = () => {
        setSearchQuery('');
        reset();
        // Refetch popular movies
        setTimeout(() => refetch(), 100);
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <View style={[styles.logoTriangle, styles.logoYellow]} />
                    <View style={[styles.logoTriangle, styles.logoPink]} />
                    <View style={[styles.logoTriangle, styles.logoBlue]} />
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#A8B5DB" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search through 300+ movies online"
                    placeholderTextColor="#A8B5DB"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus={false}
                    returnKeyType="search"
                    autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={handleClearSearch}>
                        <Ionicons name="close-circle" size={20} color="#A8B5DB" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Search Results Header */}
            {searchQuery.trim() ? (
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>
                        Search results for{' '}
                        <Text style={styles.queryText}>{searchQuery}</Text>
                    </Text>
                </View>
            ) : (
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>Popular Movies</Text>
                </View>
            )}

            {/* Loading State */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#AB8BFF" />
                    <Text style={styles.loadingText}>Loading movies...</Text>
                </View>
            )}

            {/* Error State */}
            {error && !loading && (
                <View style={styles.emptyContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
                    <Text style={styles.emptyTitle}>Something went wrong</Text>
                    <Text style={styles.emptyText}>{error.message}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Results */}
            {!loading && !error && (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <MovieCard movie={item} index={index} />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="film-outline" size={64} color="#A8B5DB" />
                            <Text style={styles.emptyTitle}>No movies found</Text>
                            <Text style={styles.emptyText}>
                                Try adjusting your search to find what you're looking for.
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        position: 'relative',
    },
    logoTriangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
    },
    logoYellow: {
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFD700',
        left: 10,
        top: 0,
    },
    logoPink: {
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FF69B4',
        left: 0,
        top: 15,
        transform: [{ rotate: '-30deg' }],
    },
    logoBlue: {
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#4169E1',
        left: 20,
        top: 15,
        transform: [{ rotate: '30deg' }],
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        marginHorizontal: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        marginLeft: 10,
        fontSize: 14,
        paddingVertical: 0,
    },
    resultsHeader: {
        marginHorizontal: 20,
        marginBottom: 16,
    },
    resultsTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    queryText: {
        color: '#AB8BFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#A8B5DB',
        marginTop: 12,
        fontSize: 14,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 120,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    movieCard: {
        width: (width - 48) / 3,
        marginBottom: 16,
        marginHorizontal: 4,
    },
    movieImageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
        borderRadius: 8,
        overflow: 'hidden',
    },
    movieImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    rankBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: '#AB8BFF',
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        color: '#000000',
        fontSize: 11,
        fontWeight: 'bold',
    },
    movieTitle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 6,
    },
    movieRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    movieRatingText: {
        color: '#FFFFFF',
        fontSize: 11,
    },
    movieGenre: {
        color: '#A8B5DB',
        fontSize: 10,
        marginTop: 2,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
    },
    emptyText: {
        color: '#A8B5DB',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    retryButton: {
        marginTop: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#AB8BFF',
        borderRadius: 20,
    },
    retryText: {
        color: '#000000',
        fontWeight: '600',
    },
});
