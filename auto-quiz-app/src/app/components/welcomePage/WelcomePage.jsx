'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Divider,
} from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 300,
      letterSpacing: '-0.00833em',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
});

export default function WelcomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            Quiz Generator
          </Typography>
          <Divider sx={{ width: '50%', margin: '2rem 0' }} />
          <Typography variant="h2" component="h2" gutterBottom>
            Craft Engaging Quizzes in Minutes
          </Typography>
          <Box sx={{ maxWidth: '600px', margin: '2rem 0' }}>
            <Typography variant="body1" paragraph>
              Welcome to Quiz Genenerator, where creativity meets simplicity.
              Our intuitive platform empowers educators, trainers, and curious
              minds to generate custom quizzes effortlessly.
            </Typography>
            <Typography variant="body1" paragraph>
              Dive into a world of knowledge creation and explore the power of
              interactive learning. Start your journey with Quiz Generator today
              and transform the way you engage with information.
            </Typography>
          </Box>
          <Divider sx={{ width: '50%', margin: '2rem 0' }} />
          <Typography
            variant="h2"
            component="h3"
            sx={{ fontStyle: 'italic', fontWeight: 300 }}
          >
            Inspire. Create. Learn.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
