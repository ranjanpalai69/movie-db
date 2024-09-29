import axios from 'axios';

const API_URL = 'https://<your-railway-url>/api/reviews'; // Replace with your actual URL

export const getReviewsByMovie = async (movieId: string) => {
    const response = await axios.get(`${API_URL}/movie/${movieId}`);
    return response.data;
};

export const addReview = async (reviewData: { movieId: string; reviewerName: string; rating: number; comments: string }) => {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
};

export const editReview = async (id: string, reviewData: { rating: number; comments: string }) => {
    const response = await axios.put(`${API_URL}/${id}`, reviewData);
    return response.data;
};

export const deleteReview = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};
