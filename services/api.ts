export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

// Genre ID to name mapping from TMDB
export const GENRE_MAP: Record<number, string> = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    video: boolean;
    original_language: string;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
    genres: { id: number; name: string }[];
    runtime: number | null;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface MovieCredits {
    id: number;
    cast: CastMember[];
    crew: { id: number; name: string; job: string; department: string }[];
}

// Helper function to get image URL
export const getImageUrl = (path: string | null, size: 'w185' | 'w500' | 'w780' | 'original' = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Helper function to get genre names from IDs
export const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map(id => GENRE_MAP[id]).filter(Boolean);
};

// Helper to format rating to 1 decimal place
export const formatRating = (rating: number): string => {
    return (rating / 2).toFixed(1); // Convert 10-point to 5-point scale
};

export const fetchMovies = async ({ query }: { query: string }): Promise<Movie[]> => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/popular`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
};

export const fetchLatestMovies = async (): Promise<Movie[]> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/now_playing`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch latest movies');
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }

    return response.json();
};

export const fetchMovieCredits = async (movieId: number): Promise<MovieCredits> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
    }

    return response.json();
};

// Watch Provider interfaces
export interface WatchProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface WatchProviderData {
    link?: string;
    flatrate?: WatchProvider[]; // Streaming
    rent?: WatchProvider[];
    buy?: WatchProvider[];
}

export interface WatchProvidersResponse {
    id: number;
    results: Record<string, WatchProviderData>;
}

export const fetchWatchProviders = async (movieId: number, region: string = 'US'): Promise<WatchProviderData | null> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/watch/providers`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch watch providers');
    }

    const data: WatchProvidersResponse = await response.json();
    
    // Return the providers for the specified region, or null if not available
    return data.results[region] || null;
};

// Helper to get provider logo URL
export const getProviderLogoUrl = (path: string): string => {
    return `https://image.tmdb.org/t/p/original${path}`;
};
