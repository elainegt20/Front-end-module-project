'use client';

import React from 'react';
import { signInUser } from '../../actions/authActions';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // This will make isValid update on each change
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await signInUser(data);
    if (result.status === 'success') {
      console.log('User logged in successfully');
      router.push('/uploadNotesPage');
      router.refresh();
    } else {
      toast.error(result.error || 'Error logging in user');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, color: 'black', fontWeight: 'bold' }}
        >
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiFormHelperText-root': { color: 'red' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiFormHelperText-root': { color: 'red' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              },
              '&:disabled': {
                bgcolor: 'rgba(0, 0, 0, 0.38)',
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          >
            Log In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="#" variant="body2" sx={{ color: 'black' }}>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </Container>
  );
};

export default LoginForm;
