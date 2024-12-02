'use client';

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const QuestionCard = ({
  questionIndex,
  question,
  onAnswerSubmit,
  onComplete,
  previousAnswerIndex,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(previousAnswerIndex);
  const [isCompleted, setIsCompleted] = useState(false);

  React.useEffect(() => {
    setSelectedAnswer(previousAnswerIndex);
  }, [previousAnswerIndex]);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onComplete();
  };

  const handleButtonClick = (index) => {
    setSelectedAnswer(index);

    const result = {
      index,
      yourAnswer: question.answers[index],
      correctAnswer: question.correct_answer,
      question: question.question,
    };

    onAnswerSubmit({ [questionIndex]: result });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        {question.question}
      </Typography>
      {question.answers.map((answer, index) => {
        return (
          <Button
            key={index}
            variant={selectedAnswer === index ? 'contained' : 'outlined'}
            fullWidth
            sx={{
              height: 60,
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: selectedAnswer === index ? 'white' : 'black',
              backgroundColor: selectedAnswer === index ? 'black' : 'white',
              marginBottom: 1,
              borderColor: 'black',
              borderWidth: 1,
              '&:hover': {
                borderColor: 'black',
                borderWidth: 1,
              },
            }}
            onClick={() => {
              handleButtonClick(index);
              handleComplete();
            }}
          >
            {answer}
          </Button>
        );
      })}
    </Box>
  );
};

export default QuestionCard;
