import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../../auth'; // Import auth to get the session

const prisma = new PrismaClient();

// Ensure the uploads directory exists

const ensureUploadsDirectory = async () => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    await fs.promises.mkdir(uploadsDir, { recursive: true });
  }
};

const generateQuizQuestionsWithAnswers = async (text) => {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    throw new Error('OpenAI API key is not set in environment variables.');
  }

  const prompt = `You are an assistant who generates quiz questions from educational material. Analyze the following text and extract the main topics and subtopics. For each subtopic, generate three multiple-choice quiz questions. Each question should have one correct answer and two incorrect answers. Provide the output in JSON format, organized by topics and subtopics.

  ${text}

  Please ensure the structure is as follows and on the array of anwers include the correct answer too on a random position.The array of answers should have 4 anwers, all of them different for each questions. Quiz topic and subtopicn should have 1-2 words:

 
   { "quizName": Quiz Name, "dashboard": [
      {
        "topic": "Topic Title",
        "subtopics": [
          {
            "subtopic": "Subtopic Title",
            "questions": [
              {
                "global_question_index": 0,
                "question": "Question 1?",
                "correct_answer": "Correct Answer 1",
                "answers": ["Incorrect Answer 1", "Correct Answer 1", "Incorrect Answer 2","Incorrect Answer 3"]
                "completed": false
              },
              {
                "global_question_index": 1,
                "question": "Question 2?",
                "correct_answer": "Correct Answer 2",
                "answers": ["Incorrect Answer 4", "Incorrect Answer 6", "Incorrect Answer 5","Correct Answer"]
                "completed": false
              },
              {
                "global_question_index": 2,
                "correct_answer": "Correct Answer 3",
                "answers": ["Incorrect Answer 9","Incorrect Answer 7", "Correct Answer 8",,"Incorrect Answer 3"]
                "completed": false
              }
            ]
          },
          ...
        ]
      },
      ...
    ]
}}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      },
    );

    //console.log('OpenAI API response:', response.data);

    // Check if response is valid JSON or contains an error
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      const questions = response.data.choices[0].message.content.trim();
      return JSON.parse(questions); // Parse the structured response
    } else {
      throw new Error('Invalid response format from OpenAI API');
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(
        'Quota exceeded. Please check your OpenAI billing details.',
      );
      throw new Error(
        'Quota exceeded. Please upgrade your plan or wait for quota reset.',
      );
    }
    // Log the full error message
    console.error('Error generating quiz questions:', error.message);
    if (error.response) {
      console.error('Error response from API:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw new Error('Failed to generate quiz questions');
  }
};

export async function POST(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 },
    );
  }
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save the file to a persistent directory
  const fileName = file.name.replace(/[\s_]/g, '');
  const filePath = path.join(process.cwd(), 'uploads', fileName);

  try {
    await ensureUploadsDirectory(); // Ensure uploads directory exists
    await writeFile(filePath, buffer); // Save the file persistently

    // Read the content of the saved text file
    const textContent = await readFile(filePath, 'utf-8');

    // Call OpenAI to generate quiz questions using the text content
    const quizData = await generateQuizQuestionsWithAnswers(textContent);

    // Save the quiz data to the database
    const savedQuiz = await prisma.quiz.create({
      data: {
        quizName: quizData.quizName,
        dashboard: JSON.stringify(quizData.dashboard), // Convert to string for storage
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      questions: savedQuiz,
    });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
