import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useSavedMovies } from '@/context/SavedMoviesContext';
import { formatRating, getGenreNames, getImageUrl, Movie } from '@/services/api';

const { width } = Dimensions.get('window');

const SavedMovieCard = ({ movie, onRemove }: { movie: Movie; onRemove: () => void }) => {
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
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                >
                    <Ionicons name="bookmark" size={16} color="#AB8BFF" />
                </TouchableOpacity>
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

const Saved = () => {
    const { savedMovies, removeMovie, loading } = useSavedMovies();

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#AB8BFF" />
                    <Text style={styles.loadingText}>Loading saved movies...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Movies</Text>
                {savedMovies.length > 0 && (
                    <Text style={styles.countText}>{savedMovies.length} movie(s)</Text>
                )}
            </View>

            {savedMovies.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                        <Ionicons name="bookmark-outline" size={64} color="#AB8BFF" />
                    </View>
                    <Text style={styles.emptyTitle}>No saved movies yet</Text>
                    <Text style={styles.emptyText}>
                        Movies you save will appear here. Start exploring and save your favorites!
                    </Text>
                    <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={() => router.push('/search')}
                    >
                        <Text style={styles.exploreButtonText}>Explore Movies</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={savedMovies}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <SavedMovieCard
                            movie={item}
                            onRemove={() => removeMovie(item.id)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    countText: {
        color: '#A8B5DB',
        fontSize: 14,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(171, 139, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    emptyText: {
        color: '#A8B5DB',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },
    exploreButton: {
        marginTop: 24,
        paddingHorizontal: 32,
        paddingVertical: 14,
        backgroundColor: '#AB8BFF',
        borderRadius: 25,
    },
    exploreButtonText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 120,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
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
    removeButton: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
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
});
