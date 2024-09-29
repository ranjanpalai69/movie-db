import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useMovieContext } from '../context/MovieContext';

const EditMovieModal: React.FC<{
    open: boolean;
    onClose: () => void;
    movie: { _id: string; name: string; releaseDate: string } | null;
}> = ({ open, onClose, movie }) => {
    const [name, setName] = useState(movie ? movie.name : '');
    const [releaseDate, setReleaseDate] = useState(movie ? movie.releaseDate : '');
    const { editMovie } = useMovieContext(); // Access editMovie from context

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (movie) {
            await editMovie(movie._id, { name, releaseDate });
            setName('');
            setReleaseDate('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: '400px',
                    margin: 'auto',
                    mt: '100px',
                    transition: 'transform 0.2s ease-in-out',
                    transform: open ? 'scale(1)' : 'scale(0.7)',
                    opacity: open ? 1 : 0,
                }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Edit Movie
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Movie Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1976d2', // Blue border
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1565c0', // Darker blue on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#0d47a1', // Dark blue when focused
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Release Date"
                        type="date"
                        fullWidth
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1976d2', // Blue border
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1565c0', // Darker blue on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#0d47a1', // Dark blue when focused
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: '#1976d2', // Primary blue color
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#1565c0', // Darker blue on hover
                            },
                            width: '100%',
                        }}
                    >
                        Update Movie
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditMovieModal;
