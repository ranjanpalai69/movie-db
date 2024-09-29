import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Box, Typography, IconButton, Card, CardContent, CircularProgress, Grid, Modal, Button, TextField 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Review {
    _id: string;
    reviewerName: string;
    rating: number;
    comments: string;
}

interface Movie {
    _id: string;
    name: string;
    releaseDate: string;
    averageRating: number | null;
}

const ReviewByMoviePage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // States for handling modal (Edit Review)
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState<Review | null>(null);
    const [editRating, setEditRating] = useState<number | string>('');
    const [editComments, setEditComments] = useState<string>('');
    
    const fetchMovieData = async () => {
        try {
            const response = await axios.get(`https://movie-db-backend-production.up.railway.app/api/movies/${movieId}/reviews`);
            setMovie(response.data.movie);
            setReviews(response.data.reviews);
        } catch (error) {
            setError('Failed to fetch movie data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, [movieId]);

    // Delete Review Function
    const handleDeleteReview = async (reviewId: string) => {
        try {
            await axios.delete(`https://movie-db-backend-production.up.railway.app/api/reviews/${reviewId}`);
            // Refetch reviews after successful deletion
            fetchMovieData();
        } catch (error) {
            console.error('Error deleting review:', error);
            setError('Failed to delete review.');
        }
    };

    // Open Edit Modal with the current review's data
    const openEditModal = (review: Review) => {
        setCurrentReview(review);
        setEditRating(review.rating);
        setEditComments(review.comments);
        setEditModalOpen(true);
    };

    // Handle edit review functionality
    const handleEditReview = async () => {
        if (editRating < 0 || editRating > 10) {
            alert('Rating must be between 0 and 10');
            return;
        }

        try {
            await axios.put(`https://movie-db-backend-production.up.railway.app/api/reviews/${currentReview?._id}`, {
                rating: editRating,
                comments: editComments
            });
            setEditModalOpen(false);
            fetchMovieData(); // Refetch reviews after successful edit
        } catch (error) {
            console.error('Error updating review:', error);
            setError('Failed to update review.');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!movie) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6">Movie not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Movie Title */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {movie.name || 'Unknown Movie'}
                </Typography>
                <Typography variant="h5" color="primary">
                    {movie.averageRating !== null && movie.averageRating !== undefined
                        ? movie.averageRating.toFixed(2)
                        : 'N/A'}/10
                </Typography>
            </Box>

            {/* Reviews Section */}
            <Box>
                {reviews.length > 0 ? (
                    <Grid container spacing={2}>
                        {reviews.map((review) => (
                            <Grid item xs={12} key={review._id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body1" fontWeight="bold">
                                                {review.comments || 'No comment provided.'}
                                            </Typography>
                                            <Typography variant="h6" color="primary">
                                                {review.rating !== null && review.rating !== undefined
                                                    ? `${review.rating}/10`
                                                    : 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            By {review.reviewerName || 'Anonymous'}
                                        </Typography>
                                        <Box display="flex" justifyContent="flex-end">
                                            <IconButton color="primary" onClick={() => openEditModal(review)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteReview(review._id)} // Delete review on click
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No reviews available for this movie.</Typography>
                )}
            </Box>

            {/* Modal for Editing Review */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    p: 4 
                }}>
                    <Typography variant="h6" mb={2}>Edit Review</Typography>
                    <TextField
                        fullWidth
                        label="Rating"
                        type="number"
                        value={editRating}
                        onChange={(e) => setEditRating(e.target.value)}
                        inputProps={{ min: 0, max: 10 }}
                        helperText="Rating should be between 0 and 10"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={editComments}
                        onChange={(e) => setEditComments(e.target.value)}
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 2 }}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleEditReview}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ReviewByMoviePage;
