'use server';

import { signIn, signOut } from '../../auth';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function signInUser(data) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' };
        default:
          return { status: 'error', error: 'Something went wrong' };
      }
    } else {
      return { status: 'error', error: 'Something else went wrong' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(data) {
  try {
    const { name, email, password } = data;

    // Basic validation
    if (!name || !email || !password) {
      return { status: 'error', error: 'All fields are required' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) return { status: 'error', error: 'User already exists' };

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    // Automatically sign in the user after successful registration
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      return { status: 'success', data: user };
    } catch (signInError) {
      console.log('Auto-login failed:', signInError);
      // Even if auto-login fails, registration was successful
      return {
        status: 'success',
        data: user,
        warning: 'Registration successful but auto-login failed',
      };
    }
  } catch (error) {
    console.log('Registration error:', error);
    return {
      status: 'error',
      error: 'Something went wrong during registration',
    };
  }
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
