import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovieContext } from '../context/MovieContext'; // Adjust the import based on your project structure

const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm } = useMovieContext();

    return (
        <Box mb={3} sx={{ maxWidth: 600 }}>
            <TextField
                variant="outlined"
                placeholder="Search for your favourite movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;
