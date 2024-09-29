import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { addReview } from '../services/reviewService';

interface ReviewFormProps {
    movieId: string;
    onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewAdded }) => {
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addReview({ movieId, reviewerName, rating, comments });
        onReviewAdded(); // Refresh the reviews
        setReviewerName('');
        setRating(0);
        setComments('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                fullWidth
            />
            <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0, max: 5 }}
            />
            <TextField
                label="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                fullWidth
            />
            <Button type="submit">Submit Review</Button>
        </form>
    );
};

export default ReviewForm;
