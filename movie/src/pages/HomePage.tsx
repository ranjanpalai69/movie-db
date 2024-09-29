import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { useMovieContext } from "../context/MovieContext"; // Import useMovieContext

const HomePage: React.FC = () => {
    const { movies, loading, error, addMovie } = useMovieContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false); // State to control modal open/close

    return (
        <Box p={3} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">The best movie reviews site!</Typography>
            </Box>

            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : (
                <MovieList movies={movies} />
            )}
        </Box>
    );
};

export default HomePage;
