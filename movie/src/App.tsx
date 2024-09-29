import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
import HomePage from "./pages/HomePage";
import MovieReviewPage from "./components/MovieReviewPage";
import ReviewSearchPage from "./pages/ReviewSearchPage";
import AddMovieModal from "./components/AddMoviewModal"; 
import AddReviewModal from "./components/AddReviewModal"; // Import AddReviewModal
import { MovieProvider } from './context/MovieContext'; // Import MovieProvider
import ReviewByMoviePage from './pages/ReviewByMoviePage';

function App() {
    const [openAddMovie, setOpenAddMovie] = useState(false); // Modal state for Add Movie
    const [openAddReview, setOpenAddReview] = useState(false); // Modal state for Add Review

    const handleReviewAdded = () => {
        // Function to refresh the data when a review is added
        // You may want to trigger a re-fetch of the reviews or movies
    };

    return (
        <MovieProvider>
            <AppBar position="static" sx={{ backgroundColor: "#e4e9f2", boxShadow: "none" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold", flexGrow: { xs: 1, sm: 0 } }}>
                        MOVIECRITIC
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: { xs: 2, sm: 0 } }}>
                        <Button variant="outlined" sx={{ textTransform: "none", borderColor: "#7d59ff", color: "#7d59ff", "&:hover": { backgroundColor: "rgba(125, 89, 255, 0.1)", borderColor: "#7d59ff" } }} onClick={() => setOpenAddMovie(true)}>
                            Add new movie
                        </Button>
                        <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#7d59ff", color: "#fff", "&:hover": { backgroundColor: "#6446d6" } }} onClick={() => setOpenAddReview(true)}>
                            Add new review
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies/:movieId" element={<MovieReviewPage />} />
                    <Route path="/reviews" element={<ReviewSearchPage />} />
                    <Route path="/reviewbymovieid/:movieId" element={<ReviewByMoviePage />} /> 
                </Routes>
            </Router>
            {/* AddMovieModal component */}
            <AddMovieModal open={openAddMovie} onClose={() => setOpenAddMovie(false)} />
            {/* AddReviewModal component */}
            <AddReviewModal open={openAddReview} onClose={() => setOpenAddReview(false)} onReviewAdded={handleReviewAdded} />
        </MovieProvider>
    );
}

export default App;
