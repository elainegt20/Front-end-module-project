'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { registerUser } from '../../actions/authActions';

const RegistrationForm = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const handleFormServerErrors = (errorResponse, setError) => {
    if (Array.isArray(errorResponse.error)) {
      errorResponse.error.forEach((e) => {
        const fieldName = e.path.join('.');
        setError(fieldName, { message: e.message });
      });
    } else {
      // Handle single error message
      setError('root.serverError', { message: errorResponse.error });
    }
  };

  const onSubmit = async () => {
    const result = await registerUser(getValues());
    if (result.status === 'success') {
      router.push('/uploadNotesPage');
      router.refresh();
    } else {
      console.log('Error registering user');
      handleFormServerErrors(result, setError);
    }
  };

  const password = watch('password', '');

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
          Sign Up
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
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
            autoFocus
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: 'Invalid name. Only letters and spaces are allowed',
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
            autoComplete="new-password"
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
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="#" variant="body2" sx={{ color: 'black' }}>
              Already have an account? Log In
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
