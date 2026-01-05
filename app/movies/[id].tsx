import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock movie data - in a real app, this would come from an API
const moviesData: Record<string, Movie> = {
    '1': {
        id: 1,
        title: 'Venom: The Last Dance',
        poster: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        rating: 4.6,
        year: 2024,
        duration: '1h 49m',
        genres: ['Action', 'Sci-Fi', 'Adventure'],
        overview: 'Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie\'s last dance.',
        director: 'Kelly Marcel',
        cast: [
            { name: 'Tom Hardy', role: 'Eddie Brock', image: 'https://image.tmdb.org/t/p/w185/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg' },
            { name: 'Chiwetel Ejiofor', role: 'Rex Strickland', image: 'https://image.tmdb.org/t/p/w185/kq5DDnqqofoRI0t6ddtRvHuo7uk.jpg' },
            { name: 'Juno Temple', role: 'Dr. Teddy Paine', image: 'https://image.tmdb.org/t/p/w185/bTtQmkXHeP4fDPoHlHaOYFCe7Y7.jpg' },
        ],
    },
    '2': {
        id: 2,
        title: 'Moana 2',
        poster: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
        rating: 4.6,
        year: 2024,
        duration: '1h 40m',
        genres: ['Adventure', 'Animation', 'Comedy'],
        overview: 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she has ever faced.',
        director: 'David Derrick Jr.',
        cast: [
            { name: 'Auli\'i Cravalho', role: 'Moana', image: 'https://image.tmdb.org/t/p/w185/hcywmwqzRPatbKvPfBaVQJlvYgF.jpg' },
            { name: 'Dwayne Johnson', role: 'Maui', image: 'https://image.tmdb.org/t/p/w185/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg' },
        ],
    },
    '3': {
        id: 3,
        title: 'Wicked',
        poster: 'https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
        rating: 4.6,
        year: 2024,
        duration: '2h 40m',
        genres: ['Musical', 'Fantasy', 'Romance'],
        overview: 'Elphaba, a young woman misunderstood because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wizard of Oz, their friendship reaches a crossroads.',
        director: 'Jon M. Chu',
        cast: [
            { name: 'Cynthia Erivo', role: 'Elphaba', image: 'https://image.tmdb.org/t/p/w185/vHLCSHsmVwjTPO7NQSZ3HRrCGaH.jpg' },
            { name: 'Ariana Grande', role: 'Glinda', image: 'https://image.tmdb.org/t/p/w185/dMXyNi8WZbOvUQQE2ZTjDMB8sWN.jpg' },
        ],
    },
    '4': {
        id: 4,
        title: 'Werewolves',
        poster: 'https://image.tmdb.org/t/p/w500/cRTctVlwvMdXVsaYbX5qfkittDP.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/cRTctVlwvMdXVsaYbX5qfkittDP.jpg',
        rating: 4.6,
        year: 2024,
        duration: '1h 33m',
        genres: ['Horror', 'Action', 'Thriller'],
        overview: 'A year after a supermoon triggered a worldwide werewolf apocalypse, a small town struggles to survive as monstrous werewolves hunt under the light of the full moon.',
        director: 'Steven C. Miller',
        cast: [
            { name: 'Frank Grillo', role: 'Lead', image: 'https://image.tmdb.org/t/p/w185/6BHtapvPgEpMYd9GjkVi3TLAsHB.jpg' },
        ],
    },
    '5': {
        id: 5,
        title: 'Aftermath',
        poster: 'https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
        rating: 4.6,
        year: 2024,
        duration: '1h 45m',
        genres: ['Action', 'Thriller'],
        overview: 'A gripping action thriller that follows survivors navigating the devastating aftermath of a catastrophic event.',
        director: 'Patrick Lussier',
        cast: [],
    },
    '6': {
        id: 6,
        title: 'Red One',
        poster: 'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
        rating: 4.6,
        year: 2024,
        duration: '2h 3m',
        genres: ['Action', 'Comedy', 'Fantasy'],
        overview: 'After Santa Claus is kidnapped, the North Pole\'s Head of Security must team up with the world\'s most infamous bounty hunter in a globe-trotting, action-packed mission to save Christmas.',
        director: 'Jake Kasdan',
        cast: [
            { name: 'Dwayne Johnson', role: 'Callum Drift', image: 'https://image.tmdb.org/t/p/w185/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg' },
            { name: 'Chris Evans', role: 'Jack O\'Malley', image: 'https://image.tmdb.org/t/p/w185/3bOGNsHlrswhyW79uvIHH1V43JI.jpg' },
            { name: 'J.K. Simmons', role: 'Santa Claus', image: 'https://image.tmdb.org/t/p/w185/oHenEanX6m77EpKg0r6ypWGpdzR.jpg' },
        ],
    },
    '7': {
        id: 7,
        title: 'Gladiator II',
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        rating: 4.6,
        year: 2024,
        duration: '2h 28m',
        genres: ['Action', 'Adventure', 'Drama'],
        overview: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.',
        director: 'Ridley Scott',
        cast: [
            { name: 'Paul Mescal', role: 'Lucius', image: 'https://image.tmdb.org/t/p/w185/eMwrSvPVqWpYvD44EGJGGDVVFfO.jpg' },
            { name: 'Pedro Pascal', role: 'Marcus Acacius', image: 'https://image.tmdb.org/t/p/w185/dBOrm29cr7NAt1XTq9hfhKnLCBY.jpg' },
            { name: 'Denzel Washington', role: 'Macrinus', image: 'https://image.tmdb.org/t/p/w185/khMf8LLTtppUwuNqqRc7lnR7Rof.jpg' },
        ],
    },
    '8': {
        id: 8,
        title: 'Kraven the Hunter',
        poster: 'https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/i47IUSsN126K11JUzqQIOi1Mg1M.jpg',
        rating: 4.6,
        year: 2024,
        duration: '2h 7m',
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        overview: 'Russian immigrant Sergei Kravinoff is on a mission to prove that he is the greatest hunter in the world.',
        director: 'J.C. Chandor',
        cast: [
            { name: 'Aaron Taylor-Johnson', role: 'Sergei Kravinoff', image: 'https://image.tmdb.org/t/p/w185/qvYMyDoQAp6Gs9N1CXVP1EgLmj5.jpg' },
            { name: 'Russell Crowe', role: 'Nikolai Kravinoff', image: 'https://image.tmdb.org/t/p/w185/uxiYYxBwiPYMudEreSYl8JGlFGz.jpg' },
        ],
    },
    '9': {
        id: 9,
        title: 'Mufasa: The Lion King',
        poster: 'https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w1280/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
        rating: 4.6,
        year: 2024,
        duration: '1h 58m',
        genres: ['Adventure', 'Animation', 'Drama'],
        overview: 'Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny.',
        director: 'Barry Jenkins',
        cast: [
            { name: 'Aaron Pierre', role: 'Mufasa', image: 'https://image.tmdb.org/t/p/w185/6EKnTyVSLB7dYlDLgeYMjIXH1we.jpg' },
            { name: 'Kelvin Harrison Jr.', role: 'Taka', image: 'https://image.tmdb.org/t/p/w185/hdGnOvroMMIqD2cZlBpGMJ20pki.jpg' },
        ],
    },
};

interface CastMember {
    name: string;
    role: string;
    image: string;
}

interface Movie {
    id: number;
    title: string;
    poster: string;
    backdrop: string;
    rating: number;
    year: number;
    duration: string;
    genres: string[];
    overview: string;
    director: string;
    cast: CastMember[];
}

// Default movie if ID not found
const defaultMovie: Movie = {
    id: 0,
    title: 'Movie Not Found',
    poster: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
    rating: 0,
    year: 2024,
    duration: 'N/A',
    genres: [],
    overview: 'Movie details not available.',
    director: 'Unknown',
    cast: [],
};

const MovieDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const movie = moviesData[id || ''] || defaultMovie;

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero Section with Backdrop */}
                <View style={styles.heroContainer}>
                    <ImageBackground
                        source={{ uri: movie.backdrop }}
                        style={styles.backdrop}
                        resizeMode="cover"
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(3, 0, 20, 0.8)', '#030014']}
                            style={styles.gradient}
                        />
                    </ImageBackground>

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={styles.bookmarkButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Movie Poster */}
                    <View style={styles.posterContainer}>
                        <Image
                            source={{ uri: movie.poster }}
                            style={styles.poster}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Movie Info */}
                <View style={styles.infoContainer}>
                    {/* Title */}
                    <Text style={styles.title}>{movie.title}</Text>

                    {/* Meta Info */}
                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color="#A8B5DB" />
                            <Text style={styles.metaText}>{movie.year}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color="#A8B5DB" />
                            <Text style={styles.metaText}>{movie.duration}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>{movie.rating}/5</Text>
                        </View>
                    </View>

                    {/* Genres */}
                    <View style={styles.genresContainer}>
                        {movie.genres.map((genre, index) => (
                            <View key={index} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Overview Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.overview}>{movie.overview}</Text>
                    </View>

                    {/* Director */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Director</Text>
                        <Text style={styles.directorText}>{movie.director}</Text>
                    </View>

                    {/* Cast Section */}
                    {movie.cast.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Cast</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.castContainer}
                            >
                                {movie.cast.map((member, index) => (
                                    <View key={index} style={styles.castCard}>
                                        <Image
                                            source={{ uri: member.image }}
                                            style={styles.castImage}
                                        />
                                        <Text style={styles.castName} numberOfLines={1}>
                                            {member.name}
                                        </Text>
                                        <Text style={styles.castRole} numberOfLines={1}>
                                            {member.role}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Play Button */}
                    <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
                        <Ionicons name="play" size={24} color="#000000" />
                        <Text style={styles.playButtonText}>Watch Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroContainer: {
        height: height * 0.5,
        position: 'relative',
    },
    backdrop: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '70%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookmarkButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    posterContainer: {
        position: 'absolute',
        bottom: -60,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 20,
    },
    poster: {
        width: 160,
        height: 240,
        borderRadius: 16,
    },
    infoContainer: {
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: '#A8B5DB',
        fontSize: 13,
    },
    metaDivider: {
        width: 1,
        height: 14,
        backgroundColor: '#A8B5DB',
        marginHorizontal: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 13,
        fontWeight: '600',
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
    },
    genreTag: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#1a1a2e',
        borderWidth: 1,
        borderColor: '#2a2a3e',
    },
    genreText: {
        color: '#A8B5DB',
        fontSize: 12,
        fontWeight: '500',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overview: {
        color: '#A8B5DB',
        fontSize: 14,
        lineHeight: 22,
    },
    directorText: {
        color: '#A8B5DB',
        fontSize: 14,
    },
    castContainer: {
        gap: 12,
    },
    castCard: {
        width: 80,
        alignItems: 'center',
        marginRight: 12,
    },
    castImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 8,
        backgroundColor: '#1a1a2e',
    },
    castName: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    castRole: {
        color: '#A8B5DB',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 2,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AB8BFF',
        paddingVertical: 16,
        borderRadius: 30,
        marginTop: 10,
        gap: 8,
    },
    playButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
