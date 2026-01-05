import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for movies
const popularMovies = [
    {
        id: 1,
        title: 'Gladiator II',
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 2,
        title: 'Mufasa: The Lion King',
        poster: 'https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 3,
        title: 'Moana 2',
        poster: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
];

const latestMovies = [
    {
        id: 4,
        title: 'Moana 2',
        poster: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 5,
        title: 'Venom: The Last...',
        poster: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 6,
        title: 'Wicked',
        poster: 'https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 7,
        title: 'Werewolves',
        poster: 'https://image.tmdb.org/t/p/w500/cRTctVlwvMdXVsaYbX5qfkittDP.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 8,
        title: 'Aftermath...',
        poster: 'https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 9,
        title: 'Red One...',
        poster: 'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 10,
        title: 'Gladiator II...',
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 11,
        title: 'Kraven the Hunter',
        poster: 'https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
    {
        id: 12,
        title: 'Mufasa: The Lion...',
        poster: 'https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
        rating: 4.6,
        genre: 'Action • Movie',
    },
];

const PopularMovieCard = ({ movie, index }: { movie: typeof popularMovies[0]; index: number }) => (
    <TouchableOpacity
        style={styles.popularCard}
        onPress={() => router.push(`/movies/${movie.id}`)}
    >
        <View style={styles.popularImageContainer}>
            <Image source={{ uri: movie.poster }} style={styles.popularImage} />
            <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color="#FFD700" />
                <Text style={styles.ratingText}>{movie.rating}</Text>
            </View>
            <Text style={styles.rankNumber}>{index + 1}</Text>
        </View>
        <Text style={styles.popularTitle} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.genreText}>{movie.genre}</Text>
    </TouchableOpacity>
);

const MovieCard = ({ movie }: { movie: typeof latestMovies[0] }) => (
    <TouchableOpacity
        style={styles.movieCard}
        onPress={() => router.push(`/movies/${movie.id}`)}
    >
        <Image source={{ uri: movie.poster }} style={styles.movieImage} />
        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
        <View style={styles.movieRating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.movieRatingText}>{movie.rating}</Text>
        </View>
        <Text style={styles.movieGenre}>{movie.genre}</Text>
    </TouchableOpacity>
);

const Home = () => {
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

                {/* Popular Movies Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular movies</Text>
                    <FlatList
                        data={popularMovies}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <PopularMovieCard movie={item} index={index} />
                        )}
                        contentContainerStyle={styles.popularList}
                    />
                </View>

                {/* Latest Movies Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Latest movies</Text>
                    <View style={styles.latestGrid}>
                        {latestMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </View>
                </View>

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
});
