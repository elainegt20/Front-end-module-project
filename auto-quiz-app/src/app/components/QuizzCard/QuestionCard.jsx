'use client'

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const QuestionCard = ({ question, onAnswerSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedAnswer(index);
        const result = {
            yourAnswer: question.answers[index],
            correctAnswer: question.correct_answer,
            question: question.question,
            subtopic: question.subtopic,
            topic: question.topic,
        };
        onAnswerSubmit(result);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {question.question}
            </Typography>
            {question.answers.map((answer, index) => (
                <Button
                    key={index}
                    variant={selectedAnswer === index ? "contained" : "outlined"}
                    fullWidth
                    sx={{
                        height: 60,
                        justifyContent: "flex-start",
                        textTransform: 'none',
                        color: selectedAnswer === index ? 'white' : 'black',
                        backgroundColor: selectedAnswer === index ? 'black' : 'white',
                        marginBottom: 1,
                        borderColor: 'black',
                        borderWidth: 1,
                        '&:hover': {
                            borderColor: 'black',
                            borderWidth: 1,
                        }
                    }}
                    onClick={() => handleButtonClick(index)}
                >
                    {answer}
                </Button>
            ))}
        </Box>
    );
};

export default QuestionCard;