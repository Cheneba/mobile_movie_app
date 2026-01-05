import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Genre filters
const genres = ['All', 'Adventure', 'Action', 'Comedy', 'Romance', 'Horror', 'Sci-Fi'];

// Mock movie data
const allMovies = [
    {
        id: 1,
        title: 'Venom: The Last...',
        poster: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
        genres: ['Action', 'Sci-Fi'],
    },
    {
        id: 2,
        title: 'Moana 2',
        poster: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
        rating: 4.6,
        genre: 'Adventure • Movie',
        genres: ['Adventure', 'Comedy'],
    },
    {
        id: 3,
        title: 'Wicked',
        poster: 'https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
        genres: ['Adventure', 'Romance'],
    },
    {
        id: 4,
        title: 'Werewolves',
        poster: 'https://image.tmdb.org/t/p/w500/cRTctVlwvMdXVsaYbX5qfkittDP.jpg',
        rating: 4.6,
        genre: 'Horror • Movie',
        genres: ['Horror', 'Action'],
    },
    {
        id: 5,
        title: 'Aftermath...',
        poster: 'https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
        genres: ['Action'],
    },
    {
        id: 6,
        title: 'Red One...',
        poster: 'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
        rating: 4.6,
        genre: 'Comedy • Movie',
        genres: ['Comedy', 'Action'],
    },
    {
        id: 7,
        title: 'Gladiator II',
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
        genres: ['Action', 'Adventure'],
    },
    {
        id: 8,
        title: 'Kraven the Hunter',
        poster: 'https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
        genres: ['Action', 'Sci-Fi'],
    },
    {
        id: 9,
        title: 'Mufasa: The Lion...',
        poster: 'https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
        rating: 4.6,
        genre: 'Adventure • Movie',
        genres: ['Adventure', 'Comedy'],
    },
];

type Movie = typeof allMovies[0];

const MovieCard = ({ movie, index }: { movie: Movie; index: number }) => (
    <TouchableOpacity
        style={styles.movieCard}
        onPress={() => router.push(`/movies/${movie.id}`)}
        activeOpacity={0.7}
    >
        <View style={styles.movieImageContainer}>
            <Image source={{ uri: movie.poster }} style={styles.movieImage} />
            {index < 10 && (
                <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                </View>
            )}
        </View>
        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
        <View style={styles.movieRating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.movieRatingText}>{movie.rating}</Text>
        </View>
        <Text style={styles.movieGenre}>{movie.genre}</Text>
    </TouchableOpacity>
);

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [isSearching, setIsSearching] = useState(false);

    // Filter movies based on search query and selected genre
    const filteredMovies = useMemo(() => {
        let results = allMovies;

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(movie =>
                movie.title.toLowerCase().includes(query)
            );
        }

        // Filter by genre
        if (selectedGenre !== 'All') {
            results = results.filter(movie =>
                movie.genres.includes(selectedGenre)
            );
        }

        return results;
    }, [searchQuery, selectedGenre]);

    const handleSearch = (text: string) => {
        setIsSearching(true);
        setSearchQuery(text);
        // Simulate search delay
        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
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
                        onChangeText={handleSearch}
                        autoFocus={false}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#A8B5DB" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Search Results Header */}
                {searchQuery.trim() ? (
                    <View style={styles.resultsHeader}>
                        <Text style={styles.resultsTitle}>
                            Search results for <Text style={styles.queryText}>{searchQuery}</Text>
                        </Text>
                    </View>
                ) : (
                    <View style={styles.resultsHeader}>
                        <Text style={styles.resultsTitle}>Browse Movies</Text>
                    </View>
                )}

                {/* Genre Filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.genreContainer}
                >
                    {genres.map((genre) => (
                        <TouchableOpacity
                            key={genre}
                            style={[
                                styles.genreButton,
                                selectedGenre === genre && styles.genreButtonActive,
                            ]}
                            onPress={() => setSelectedGenre(genre)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.genreText,
                                    selectedGenre === genre && styles.genreTextActive,
                                ]}
                            >
                                {genre}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Loading Indicator */}
                {isSearching && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#AB8BFF" />
                    </View>
                )}

                {/* Results */}
                {!isSearching && (
                    <>
                        {filteredMovies.length > 0 ? (
                            <View style={styles.moviesGrid}>
                                {filteredMovies.map((movie, index) => (
                                    <MovieCard key={movie.id} movie={movie} index={index} />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="film-outline" size={64} color="#A8B5DB" />
                                <Text style={styles.emptyTitle}>No movies found</Text>
                                <Text style={styles.emptyText}>
                                    Try adjusting your search or filter to find what you're looking for.
                                </Text>
                            </View>
                        )}
                    </>
                )}

                {/* Bottom spacing for tab bar */}
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
    },
    scrollContent: {
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
    genreContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 8,
    },
    genreButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1a1a2e',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#2a2a3e',
    },
    genreButtonActive: {
        backgroundColor: '#AB8BFF',
        borderColor: '#AB8BFF',
    },
    genreText: {
        color: '#A8B5DB',
        fontSize: 13,
        fontWeight: '500',
    },
    genreTextActive: {
        color: '#000000',
        fontWeight: '600',
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    moviesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
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
});
