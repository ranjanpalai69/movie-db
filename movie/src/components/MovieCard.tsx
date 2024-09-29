import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMovieModal from './EditMoviewModal'; // Import the EditMovieModal component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface MovieCardProps {
    movie: { id: string; name: string; releaseDate: string; averageRating: number };
    onDelete: () => void; // Prop for delete functionality
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    return (
        <Card 
            onClick={() => navigate(`/reviewbymovieid/${movie._id}`)} // Navigate on card click
            sx={{
                margin: 1,
                backgroundColor: '#ecefff',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }} 
        >
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {movie.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                    Released: {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mt={1} sx={{ fontWeight: 'bold' }}>
                    Rating: {movie.averageRating}/10
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton onClick={onDelete} color="error" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); setEditModalOpen(true); }} color="primary">
                        <EditIcon />
                    </IconButton>
                </Box>
            </CardContent>

            {/* EditMovieModal */}
            <EditMovieModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                movie={movie} // Pass the current movie details
            />
        </Card>
    );
};

export default MovieCard;
