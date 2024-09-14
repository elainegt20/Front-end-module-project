import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

// Ensure the uploads directory exists
//checking
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

  const prompt = `You are an assistant who generates quiz questions from educational material. Analyze the following text and extract the main topics and subtopics. For each subtopic, generate three multiple-choice quiz questions. Each question should have one correct answer and two incorrect answers. Provide the output in JSON format, organized by topics and subtopics.On the array of anwers include the correct answer too on a random position.

  ${text}

  Please ensure the structure is as follows:

 
    "dashboard": [
      {
        "topic": "Topic Title",
        "subtopics": [
          {
            "subtopic": "Subtopic Title",
            "questions": [
              {
                "question": "Question 1?",
                "correct_answer": "Correct Answer",
                "answers": ["Incorrect Answer 1", "Correct Answer", "Incorrect Answer 2","Incorrect Answer 3"]
                "completed": false
              },
              {
                "question": "Question 2?",
                "correct_answer": "Correct Answer",
                "answers": ["Incorrect Answer 1", "Incorrect Answer 2", "Incorrect Answer 3","Correct Answer"]
                "completed": false
              },
              {
                "question": "Question 3?",
                "correct_answer": "Correct Answer",
                "answers": ["Incorrect Answer 1","Incorrect Answer 2", "Correct Answer",,"Incorrect Answer 3"]
                "completed": false
              }
            ]
          },
          ...
        ]
      },
      ...
    ]
}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
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

    console.log('OpenAI API response:', response.data);

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
    // Log the full error message for diagnosis
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
  const data = await request.formData();
  const file = data.get('file');
  const openaiApiKey = process.env.OPENAI_API_KEY;
  console.log('OpenAI API Key:', openaiApiKey);

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
    console.log(`File saved to ${filePath}`);

    // Read the content of the saved text file
    const textContent = await readFile(filePath, 'utf-8');
    console.log('Extracted text content from file:', textContent);

    // Call OpenAI to generate quiz questions using the text content
    const quizData = await generateQuizQuestionsWithAnswers(textContent);
    console.log('Quiz data:', quizData);

    // Return the result from OpenAI
    return NextResponse.json({
      success: true,
      questions: quizData,
    });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
