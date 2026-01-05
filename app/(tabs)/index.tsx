import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    fetchLatestMovies,
    fetchPopularMovies,
    formatRating,
    getGenreNames,
    getImageUrl,
    Movie,
} from '@/services/api';
import useFetch from '@/services/useFetch';

const { width } = Dimensions.get('window');

const PopularMovieCard = ({ movie, index }: { movie: Movie; index: number }) => {
    const genreNames = getGenreNames(movie.genre_ids);
    const genreText = genreNames.length > 0 ? `${genreNames[0]} • Movie` : 'Movie';

    return (
        <TouchableOpacity
            style={styles.popularCard}
            onPress={() => router.push(`/movies/${movie.id}`)}
        >
            <View style={styles.popularImageContainer}>
                <Image
                    source={{ uri: getImageUrl(movie.poster_path) }}
                    style={styles.popularImage}
                />
                <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={10} color="#FFD700" />
                    <Text style={styles.ratingText}>{formatRating(movie.vote_average)}</Text>
                </View>
                <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.popularTitle} numberOfLines={1}>
                {movie.title}
            </Text>
            <Text style={styles.genreText}>{genreText}</Text>
        </TouchableOpacity>
    );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
    const genreNames = getGenreNames(movie.genre_ids);
    const genreText = genreNames.length > 0 ? `${genreNames[0]} • Movie` : 'Movie';

    return (
        <TouchableOpacity
            style={styles.movieCard}
            onPress={() => router.push(`/movies/${movie.id}`)}
        >
            <Image
                source={{ uri: getImageUrl(movie.poster_path) }}
                style={styles.movieImage}
            />
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

const Home = () => {
    const {
        data: popularMovies,
        loading: popularLoading,
        error: popularError,
    } = useFetch<Movie[]>(fetchPopularMovies);

    const {
        data: latestMovies,
        loading: latestLoading,
        error: latestError,
    } = useFetch<Movie[]>(fetchLatestMovies);

    const loading = popularLoading || latestLoading;

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
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => router.push('/search')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="search" size={20} color="#A8B5DB" />
                    <Text style={styles.searchPlaceholder}>
                        Search through 300+ movies online
                    </Text>
                </TouchableOpacity>

                {/* Loading State */}
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#AB8BFF" />
                        <Text style={styles.loadingText}>Loading movies...</Text>
                    </View>
                )}

                {/* Popular Movies Section */}
                {!popularLoading && !popularError && popularMovies && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Popular movies</Text>
                        <FlatList
                            data={popularMovies.slice(0, 5)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <PopularMovieCard movie={item} index={index} />
                            )}
                            contentContainerStyle={styles.popularList}
                        />
                    </View>
                )}

                {/* Latest Movies Section */}
                {!latestLoading && !latestError && latestMovies && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Latest movies</Text>
                        <View style={styles.latestGrid}>
                            {latestMovies.slice(0, 9).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </View>
                    </View>
                )}

                {/* Error State */}
                {(popularError || latestError) && !loading && (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
                        <Text style={styles.errorText}>Failed to load movies</Text>
                    </View>
                )}

                {/* Bottom spacing for tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

export default Home;

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
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 24,
    },
    searchPlaceholder: {
        color: '#A8B5DB',
        marginLeft: 10,
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 16,
    },
    popularList: {
        paddingLeft: 20,
    },
    popularCard: {
        marginRight: 16,
        width: 140,
    },
    popularImageContainer: {
        position: 'relative',
        width: 140,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    popularImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        gap: 2,
    },
    ratingText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
    },
    rankNumber: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        color: '#FFFFFF',
        fontSize: 48,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    popularTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    genreText: {
        color: '#A8B5DB',
        fontSize: 12,
        marginTop: 2,
    },
    latestGrid: {
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
    movieImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
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
    loadingContainer: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    loadingText: {
        color: '#A8B5DB',
        marginTop: 12,
        fontSize: 14,
    },
    errorContainer: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    errorText: {
        color: '#A8B5DB',
        marginTop: 12,
        fontSize: 14,
    },
});
