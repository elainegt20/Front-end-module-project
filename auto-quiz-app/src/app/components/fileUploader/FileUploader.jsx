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
      router.push('/quizPage');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box
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
  );
}
