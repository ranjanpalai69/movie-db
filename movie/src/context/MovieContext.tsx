import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllMovies, addMovie as apiAddMovie, deleteMovie as apiDeleteMovie, editMovie as apiEditMovie } from '../services/movieService'; // Import editMovie from movieService

interface Movie {
    id: string;
    name: string;
    releaseDate: string;
    averageRating: number;
}

interface MovieContextType {
    movies: Movie[];
    loading: boolean;
    error: string;
    addMovie: (name: string, releaseDate: string) => Promise<void>;
    editMovie: (id: string, movieData: { name: string; releaseDate: string }) => Promise<void>; // Add editMovie to the context type
    deleteMovie: (id: string) => Promise<void>;
    fetchMovies: (searchTerm: string) => Promise<void>; // Accept search term
    searchTerm: string; // New property for search term
    setSearchTerm: (term: string) => void; // New property to set search term
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Debounce delay of 500ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const fetchMovies = async (search: string = '') => {
        setLoading(true);
        setError('');
        try {
            const movieData = await getAllMovies(search); // Pass search term to API
            setMovies(movieData);
        } catch (e) {
            setError('Error fetching movies');
        } finally {
            setLoading(false);
        }
    };

    const addMovie = async (name: string, releaseDate: string) => {
        setLoading(true);
        setError('');
        try {
            await apiAddMovie({ name, releaseDate });
            await fetchMovies(debouncedSearchTerm); // Refresh movie list after adding
        } catch (e) {
            setError('Error adding movie');
        } finally {
            setLoading(false);
        }
    };

    const editMovie = async (id: string, movieData: { name: string; releaseDate: string }) => {
        setLoading(true);
        setError('');
        try {
            await apiEditMovie(id, movieData); // Call the editMovie API function
            await fetchMovies(debouncedSearchTerm); // Refresh movie list after editing
        } catch (e) {
            setError('Error editing movie');
        } finally {
            setLoading(false);
        }
    };

    const deleteMovie = async (id: string) => {
        setLoading(true);
        setError('');
        try {
            await apiDeleteMovie(id);
            await fetchMovies(debouncedSearchTerm); // Refresh movie list after deleting
        } catch (e) {
            setError('Error deleting movie');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm); // Fetch movies on mount and whenever the debounced search term changes
    }, [debouncedSearchTerm]);

    return (
        <MovieContext.Provider value={{ movies, loading, error, addMovie, editMovie, deleteMovie, fetchMovies, searchTerm, setSearchTerm }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};
