// import axios from 'axios';

import axios from "axios";

const API_URL = 'https://movie-db-backend-production.up.railway.app/api/movies'; // Replace with your actual API URL

export const getAllMovies = async (search: string) => {
    const response = await axios.get(API_URL, { params: { search } });
    return response.data;
};

export const addMovie = async (movie: { name: string; releaseDate: string }) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    });
    if (!response.ok) {
        throw new Error('Failed to add movie');
    }
    return response.json();
};

export const deleteMovie = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    console.log(id,"res id")
    // console.log(response,"delete response");
    if (!response.ok) {
        throw new Error('Failed to delete movie');
    }
};

export const editMovie = async (id: string, movieData: { name: string; releaseDate: string }) => {
    const response = await axios.put(`${API_URL}/${id}`, movieData);
    return response.data;
};