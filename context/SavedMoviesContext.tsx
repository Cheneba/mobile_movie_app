import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Movie } from '@/services/api';

const STORAGE_KEY = 'saved_movies';

interface SavedMoviesContextType {
    savedMovies: Movie[];
    saveMovie: (movie: Movie) => Promise<void>;
    removeMovie: (movieId: number) => Promise<void>;
    isMovieSaved: (movieId: number) => boolean;
    toggleSaveMovie: (movie: Movie) => Promise<void>;
    loading: boolean;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    // Load saved movies from storage on mount
    useEffect(() => {
        loadSavedMovies();
    }, []);

    const loadSavedMovies = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSavedMovies(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading saved movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveMovie = useCallback(async (movie: Movie) => {
        try {
            const updated = [...savedMovies, movie];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setSavedMovies(updated);
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    }, [savedMovies]);

    const removeMovie = useCallback(async (movieId: number) => {
        try {
            const updated = savedMovies.filter(m => m.id !== movieId);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setSavedMovies(updated);
        } catch (error) {
            console.error('Error removing movie:', error);
        }
    }, [savedMovies]);

    const isMovieSaved = useCallback((movieId: number) => {
        return savedMovies.some(m => m.id === movieId);
    }, [savedMovies]);

    const toggleSaveMovie = useCallback(async (movie: Movie) => {
        if (isMovieSaved(movie.id)) {
            await removeMovie(movie.id);
        } else {
            await saveMovie(movie);
        }
    }, [isMovieSaved, removeMovie, saveMovie]);

    return (
        <SavedMoviesContext.Provider
            value={{
                savedMovies,
                saveMovie,
                removeMovie,
                isMovieSaved,
                toggleSaveMovie,
                loading,
            }}
        >
            {children}
        </SavedMoviesContext.Provider>
    );
};

export const useSavedMovies = () => {
    const context = useContext(SavedMoviesContext);
    if (!context) {
        throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
    }
    return context;
};
