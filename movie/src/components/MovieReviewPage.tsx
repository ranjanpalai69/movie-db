import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsByMovie } from '../services/reviewService';
import ReviewForm from './ReviewForm';

const MovieReviewPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsData = await getReviewsByMovie(movieId);
            setReviews(reviewsData);
            setLoading(false);
        };

        fetchReviews();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map(review => (
                <div key={review.id}>
                    <h4>{review.reviewerName}</h4>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comments}</p>
                </div>
            ))}
            <ReviewForm movieId={movieId} onReviewAdded={fetchReviews} />
        </div>
    );
};

export default MovieReviewPage;
