import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    fetchMovieCredits,
    fetchMovieDetails,
    fetchWatchProviders,
    formatRating,
    getImageUrl,
    getProviderLogoUrl,
    MovieCredits,
    MovieDetails as MovieDetailsType,
    WatchProviderData,
} from '@/services/api';
import useFetch from '@/services/useFetch';

const { height } = Dimensions.get('window');

// Helper to format runtime
const formatRuntime = (minutes: number | null): string => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

// Helper to get year from release date
const getYear = (date: string): string => {
    if (!date) return 'N/A';
    return new Date(date).getFullYear().toString();
};

const MovieDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const movieId = parseInt(id || '0', 10);

    const {
        data: movie,
        loading: movieLoading,
        error: movieError,
    } = useFetch<MovieDetailsType>(() => fetchMovieDetails(movieId), true);

    const {
        data: credits,
        loading: creditsLoading,
    } = useFetch<MovieCredits>(() => fetchMovieCredits(movieId), true);

    const {
        data: watchProviders,
        loading: providersLoading,
    } = useFetch<WatchProviderData | null>(() => fetchWatchProviders(movieId), true);

    const loading = movieLoading || creditsLoading;

    // Get director from crew
    const director = credits?.crew?.find((member) => member.job === 'Director')?.name || 'Unknown';

    // Get top cast members
    const cast = credits?.cast?.slice(0, 10) || [];

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#AB8BFF" />
                <Text style={styles.loadingText}>Loading movie details...</Text>
            </View>
        );
    }

    if (movieError || !movie) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
                <Text style={styles.errorTitle}>Failed to load movie</Text>
                <Text style={styles.errorText}>
                    {movieError?.message || 'Something went wrong'}
                </Text>
                <TouchableOpacity
                    style={styles.backButtonError}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={20} color="#000" />
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                        source={{ uri: getImageUrl(movie.backdrop_path || movie.poster_path, 'w780') }}
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
                            source={{ uri: getImageUrl(movie.poster_path) }}
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
                            <Text style={styles.metaText}>{getYear(movie.release_date)}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color="#A8B5DB" />
                            <Text style={styles.metaText}>{formatRuntime(movie.runtime)}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>
                                {formatRating(movie.vote_average)}/5
                            </Text>
                        </View>
                    </View>

                    {/* Genres */}
                    <View style={styles.genresContainer}>
                        {movie.genres?.map((genre) => (
                            <View key={genre.id} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Overview Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.overview}>
                            {movie.overview || 'No overview available.'}
                        </Text>
                    </View>

                    {/* Director */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Director</Text>
                        <Text style={styles.directorText}>{director}</Text>
                    </View>

                    {/* Cast Section */}
                    {cast.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Cast</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.castContainer}
                            >
                                {cast.map((member) => (
                                    <View key={member.id} style={styles.castCard}>
                                        <Image
                                            source={{
                                                uri: getImageUrl(member.profile_path, 'w185'),
                                            }}
                                            style={styles.castImage}
                                        />
                                        <Text style={styles.castName} numberOfLines={1}>
                                            {member.name}
                                        </Text>
                                        <Text style={styles.castRole} numberOfLines={1}>
                                            {member.character}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Where to Watch Section */}
                    {watchProviders && (watchProviders.flatrate || watchProviders.rent || watchProviders.buy) && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Where to Watch</Text>
                            
                            {/* Streaming */}
                            {watchProviders.flatrate && watchProviders.flatrate.length > 0 && (
                                <View style={styles.providerSection}>
                                    <View style={styles.providerLabelContainer}>
                                        <Ionicons name="play-circle" size={16} color="#4CAF50" />
                                        <Text style={styles.providerLabel}>Stream</Text>
                                    </View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.providersRow}
                                    >
                                        {watchProviders.flatrate.map((provider) => (
                                            <TouchableOpacity
                                                key={provider.provider_id}
                                                style={styles.providerCard}
                                                onPress={() => watchProviders.link && Linking.openURL(watchProviders.link)}
                                                activeOpacity={0.7}
                                            >
                                                <Image
                                                    source={{ uri: getProviderLogoUrl(provider.logo_path) }}
                                                    style={styles.providerLogo}
                                                />
                                                <Text style={styles.providerName} numberOfLines={1}>
                                                    {provider.provider_name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {/* Rent */}
                            {watchProviders.rent && watchProviders.rent.length > 0 && (
                                <View style={styles.providerSection}>
                                    <View style={styles.providerLabelContainer}>
                                        <Ionicons name="pricetag" size={16} color="#FF9800" />
                                        <Text style={styles.providerLabel}>Rent</Text>
                                    </View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.providersRow}
                                    >
                                        {watchProviders.rent.map((provider) => (
                                            <TouchableOpacity
                                                key={provider.provider_id}
                                                style={styles.providerCard}
                                                onPress={() => watchProviders.link && Linking.openURL(watchProviders.link)}
                                                activeOpacity={0.7}
                                            >
                                                <Image
                                                    source={{ uri: getProviderLogoUrl(provider.logo_path) }}
                                                    style={styles.providerLogo}
                                                />
                                                <Text style={styles.providerName} numberOfLines={1}>
                                                    {provider.provider_name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {/* Buy */}
                            {watchProviders.buy && watchProviders.buy.length > 0 && (
                                <View style={styles.providerSection}>
                                    <View style={styles.providerLabelContainer}>
                                        <Ionicons name="cart" size={16} color="#2196F3" />
                                        <Text style={styles.providerLabel}>Buy</Text>
                                    </View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.providersRow}
                                    >
                                        {watchProviders.buy.map((provider) => (
                                            <TouchableOpacity
                                                key={provider.provider_id}
                                                style={styles.providerCard}
                                                onPress={() => watchProviders.link && Linking.openURL(watchProviders.link)}
                                                activeOpacity={0.7}
                                            >
                                                <Image
                                                    source={{ uri: getProviderLogoUrl(provider.logo_path) }}
                                                    style={styles.providerLogo}
                                                />
                                                <Text style={styles.providerName} numberOfLines={1}>
                                                    {provider.provider_name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            <Text style={styles.providerAttribution}>
                                Data provided by JustWatch
                            </Text>
                        </View>
                    )}

                    {/* Watch Now Button */}
                    {watchProviders?.link ? (
                        <TouchableOpacity
                            style={styles.playButton}
                            activeOpacity={0.8}
                            onPress={() => Linking.openURL(watchProviders.link!)}
                        >
                            <Ionicons name="play" size={24} color="#000000" />
                            <Text style={styles.playButtonText}>Watch Now</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.noProvidersContainer}>
                            <Ionicons name="information-circle-outline" size={20} color="#A8B5DB" />
                            <Text style={styles.noProvidersText}>
                                Not available for streaming in your region
                            </Text>
                        </View>
                    )}
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
    loadingContainer: {
        flex: 1,
        backgroundColor: '#030014',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#A8B5DB',
        marginTop: 12,
        fontSize: 14,
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#030014',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    errorTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    errorText: {
        color: '#A8B5DB',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    backButtonError: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#AB8BFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 24,
        gap: 8,
    },
    backButtonText: {
        color: '#000',
        fontWeight: '600',
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
    providerSection: {
        marginBottom: 16,
    },
    providerLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 10,
    },
    providerLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    providersRow: {
        gap: 12,
    },
    providerCard: {
        alignItems: 'center',
        width: 70,
    },
    providerLogo: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginBottom: 6,
        backgroundColor: '#1a1a2e',
    },
    providerName: {
        color: '#A8B5DB',
        fontSize: 10,
        textAlign: 'center',
    },
    providerAttribution: {
        color: '#666',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 8,
    },
    noProvidersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        marginTop: 10,
    },
    noProvidersText: {
        color: '#A8B5DB',
        fontSize: 13,
    },
});
