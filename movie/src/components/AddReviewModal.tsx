import React, { useState, useContext, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useMovieContext } from '../context/MovieContext';


interface AddReviewModalProps {
    open: boolean;
    onClose: () => void;
    onReviewAdded: () => void; // Callback to refresh the reviews
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ open, onClose, onReviewAdded }) => {
    const { movies } = useMovieContext(); // Assuming MovieContext provides movies
    const [selectedMovieId, setSelectedMovieId] = useState<string>('');
    const [reviewerName, setReviewerName] = useState<string>('');
    const [rating, setRating] = useState<number | string>('');
    const [comments, setComments] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        console.log(selectedMovieId,"id")
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/movies/${selectedMovieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewerName, rating, comments, movieId: selectedMovieId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add review');
            }

            await response.json();
            onReviewAdded(); // Call the callback to refresh the reviews
            onClose(); // Close the modal
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Add New Review
                </Typography>
                <TextField
                    select
                    label="Select Movie"
                    value={selectedMovieId}
                    onChange={(e) => setSelectedMovieId(e.target.value)}
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ mb: 2 }}
                >
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}>
                            {movie.name}
                        </option>
                    ))}
                </TextField>
                <TextField
                    label="Reviewer Name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default AddReviewModal;
