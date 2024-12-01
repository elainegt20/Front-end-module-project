'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Paper,
  Button,
  Skeleton,
} from '@mui/material';
import { QuizOutlined, DeleteOutline } from '@mui/icons-material';
import { getQuizzes, deleteQuizById } from '../actions/quizActions';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default function UserQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const result = await getQuizzes();
        if (result.status === 'error') {
          throw new Error(result.error);
        }
        setQuizzes(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = (id, e) => {
    e.preventDefault();
    deleteQuizById(id);
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
  };

  const renderQuizzes = () => {
    if (loading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ mb: 3, borderRadius: 2 }}
        />
      ));
    }

    if (error) {
      return (
        <Paper
          elevation={0}
          sx={{ p: 4, borderRadius: 2, border: '1px solid #e0e0e0' }}
        >
          <Typography color="error">Error loading quizzes: {error}</Typography>
        </Paper>
      );
    }

    return quizzes.map((quiz) => (
      <Paper
        key={quiz.id}
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}
        >
          <QuizOutlined sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            {quiz.quizName}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<DeleteOutline />}
            onClick={(e) => handleDelete(quiz.id, e)}
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.23)',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Delete
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {quiz.dashboard.length} Topics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Created: {new Date(quiz.createdAt).toLocaleDateString()}
        </Typography>
        <Link href={`/quizzesPage/${quiz.id}`} passHref>
          <Button
            variant="text"
            sx={{
              alignSelf: 'flex-start',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Edit Quiz
          </Button>
        </Link>
      </Paper>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Your Quizzes
          </Typography>
          {renderQuizzes()}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
