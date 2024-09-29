import React from 'react';
import MovieCard from './MovieCard';
import { Grid, Box } from '@mui/material';
import { useMovieContext } from '../context/MovieContext';

const MovieList: React.FC = () => {
    const { movies, deleteMovie } = useMovieContext(); // Use context to access movies and deleteMovie

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                        <MovieCard movie={movie} onDelete={() => deleteMovie(movie._id)} /> {/* Pass delete function */}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MovieList;
