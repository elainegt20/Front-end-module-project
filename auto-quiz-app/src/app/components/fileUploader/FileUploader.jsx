'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Upload,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import UtilButton from '../Button/Button';
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
        p: 4, // Increase padding for a larger box
        border: '1px dashed grey',
        borderRadius: 2,
        textAlign: 'center',
        maxWidth: 600, // Increase max width for a larger box
        bgcolor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography
        variant="h4" // Increase font size for a larger title
        gutterBottom
        sx={{ color: 'black', fontWeight: 'bold' }}
      >
        Upload Your File
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          inputRef={fileInputRef}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{
            mb: 3, // Increase margin bottom for more spacing
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

{
  /* <Box
sx={{
  p: 2,
  border: '1px dashed grey',
  borderRadius: 2,
  textAlign: 'center',
  maxWidth: 400,
}}
>
<Typography variant="h6" gutterBottom>
  Upload Your File
</Typography>
<form onSubmit={onSubmit}>
  <TextField
    type="file"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
    inputRef={fileInputRef}
    variant="outlined"
    InputLabelProps={{ shrink: true }}
    sx={{ mb: 2 }}
    accept=".txt"
  />
  <Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={loading}
  >
    {loading ? <CircularProgress size={24} /> : 'Generate Quiz'}
  </Button>
</form>
</Box>
); */
}
