'use server';
import { prisma } from '../../lib/prisma';
import { sendUpdatedCredentialsEmail } from '../../lib/mail';
import { generateToken } from '../../lib/token';
import bcrypt from 'bcryptjs';

export async function getUsers() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function deleteUser(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

export async function updateUser(userId, userData, plainTextPassword) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!userData || !userData.name || !userData.email) {
      throw new Error('User data is incomplete');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Update the user in the database
    if (plainTextPassword) {
      const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
      userData.passwordHash = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userData.name,
        email: userData.email,
        passwordHash: userData.passwordHash,
      },
    });

    // Generate a token using the user's email
    const token = await generateToken(updatedUser.email);

    // Send an email with the updated credentials
    await sendUpdatedCredentialsEmail(
      updatedUser.email,
      token,
      plainTextPassword,
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}
