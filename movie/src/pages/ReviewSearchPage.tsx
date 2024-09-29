import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { getReviewsByMovie } from '../services/reviewService';

const ReviewSearchPage: React.FC = () => {
    const [movieId, setMovieId] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleSearch = async () => {
        const reviewsData = await getReviewsByMovie(movieId);
        setReviews(reviewsData);
    };

    return (
        <div>
            <TextField
                label="Movie ID"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
            />
            <Button onClick={handleSearch}>Search Reviews</Button>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <Typography variant="h6">{review.reviewerName}</Typography>
                        <Typography>Rating: {review.rating}</Typography>
                        <Typography>{review.comments}</Typography>
                    </div>
                ))
            ) : (
                <Typography>No reviews found</Typography>
            )}
        </div>
    );
};

export default ReviewSearchPage;
