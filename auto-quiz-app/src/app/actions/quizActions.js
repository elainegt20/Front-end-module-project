'use server';
import { prisma } from '../../lib/prisma';
import { auth } from '../../auth';

export async function getQuizzes(orderBy = 'createdAt') {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const quizzesSelect = {
      where: {
        userId: session.user.id,
      },
    };

    const quizzes = await prisma.quiz.findMany({
      ...quizzesSelect,
      orderBy: { [orderBy]: 'desc' },
    });

    // Parse the JSON dashboard field for each quiz
    const parsedQuizzes = quizzes.map((quiz) => ({
      ...quiz,
      dashboard: JSON.parse(quiz.dashboard),
    }));

    return {
      status: 'success',
      data: parsedQuizzes,
    };
  } catch (error) {
    console.log('Error fetching quizzes:', error);
    return {
      status: 'error',
      error: 'Failed to fetch quizzes',
    };
  }
}

// Get a specific quiz by ID
export async function getQuizById(quizId) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const quiz = await prisma.quiz.findFirst({
      where: {
        id: quizId,
        userId: session.user.id,
      },
    });

    if (!quiz) {
      return {
        status: 'error',
        error: 'Quiz not found',
      };
    }

    console.log('Quiz:', quiz);
    return {
      status: 'success',
      data: {
        ...quiz,
        answers: JSON.parse(quiz.answers),
        dashboard: JSON.parse(quiz.dashboard),
      },
    };
  } catch (error) {
    console.log('Error fetching quiz:', error);
    return {
      status: 'error',
      error: 'Failed to fetch quiz',
    };
  }
}

export async function deleteQuizById(quizId) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    // First check if quiz exists and belongs to user
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: quizId,
        userId: session.user.id,
      },
    });

    if (!quiz) {
      return {
        status: 'error',
        error: 'Quiz not found',
      };
    }

    // Delete the quiz
    await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    return {
      status: 'success',
      message: 'Quiz deleted successfully',
    };
  } catch (error) {
    console.log('Error deleting quiz:', error);
    return {
      status: 'error',
      error: 'Failed to delete quiz',
    };
  }
}

export async function saveQuizAnswers(quizId, answers) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      data: {
        answers: answers,
      },
    });

    console.log('XX');
    return { status: 'success', data: updatedQuiz };
  } catch (error) {
    console.log('YY');
    console.error('Error saving answers:', error);
    return { status: 'error', message: error.message };
  }
}

export async function getQuizAnswers(quizId) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const quiz = await prisma.quiz.findFirst({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      select: {
        answers: true,
      },
    });

    if (!quiz) {
      return {
        status: 'error',
        error: 'Quiz not found',
      };
    }

    if (quiz.answers) {
      return {
        status: 'success',
        data: JSON.parse(quiz.answers),
      };
    }

    return {
      status: 'error',
      error: 'No answers found',
    };
  } catch (error) {
    console.error('Error fetching answers:', error);
    return {
      status: 'error',
      error: 'Failed to fetch answers',
    };
  }
}

export async function clearQuizAnswers(quizId) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Not authenticated');
    }

    await prisma.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      data: {
        answers: null,
      },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Error clearing answers:', error);
    return { status: 'error', message: error.message };
  }
}
