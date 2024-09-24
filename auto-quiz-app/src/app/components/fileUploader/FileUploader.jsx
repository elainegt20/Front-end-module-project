'use client';

import React from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function FileUploader() {
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.set('file', file);

      const response = await axios.post('/api/upload', data);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const result = response.data;

      // Clear the file input after upload is complete
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Store the data in local storage
      localStorage.setItem('quizData', JSON.stringify(result.questions));

      // Navigate to the quiz page
      router.push('/pages/quizPage');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 6, // Increase padding for a larger box
        border: '1px dashed grey',
        borderRadius: 2,
        textAlign: 'center',
        width: '80%', // Increase width for a larger box
        maxWidth: 800, // Set a max width to prevent it from being too large
        bgcolor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // Arrange items in a column
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        mx: 'auto', // Center the box horizontally
        my: 4, // Add vertical margin to center the box vertically
      }}
    >
      <Typography
        variant="h4" // Increase font size for a larger title
        gutterBottom
        sx={{ color: 'black', fontWeight: 'bold' }}
      >
        Upload Your File
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 600 }}>
        <TextField
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          inputRef={fileInputRef}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{
            mb: 3, // Increase margin bottom for more spacing
            width: '100%', // Make the input field take full width
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputBase-input': {
              color: 'black',
            },
            '& .MuiFormLabel-root': {
              color: 'black',
            },
          }}
          accept=".txt"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: 'grey.800',
            },
            '&:disabled': {
              bgcolor: 'grey.400',
              color: 'white',
            },
            fontSize: '1.2rem', // Increase font size for a larger button
            padding: '10px 20px', // Increase padding for a larger button
            width: '100%', // Make the button take full width
            paddingLeft: '50px',
          }}
          disabled={loading}
        >
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <CircularProgress size={24} sx={{ color: 'white' }} />
            </Box>
          ) : (
            'Generate Quiz'
          )}
        </Button>
      </form>
    </Box>
  );
}
