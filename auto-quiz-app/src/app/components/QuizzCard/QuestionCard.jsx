'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';



const QuestionCard = ({question}) => {

    const [selectedAnswer, setSelectedAnswer] = React.useState(null);

    const handleAnswerSelect = (index) => {
      setSelectedAnswer(index);
    };
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold',marginBottom:1 }}>
        {question.question}
      </Typography>
      {question.answers.map((answer, iIndex) => (
        <Button
          key={iIndex}
          variant={selectedAnswer === iIndex ? "contained" : "outlined"}
          fullWidth
          sx={{
            height: 60,
            justifyContent: "flex-start",
            textTransform: 'none',
            color: selectedAnswer === iIndex ? 'white' : 'black',
            backgroundColor: selectedAnswer === iIndex ? 'black' : 'white',
            marginBottom: 1,
            borderColor: 'black',
            borderWidth: 1,
            '&:hover': {
              borderColor: 'black',
              borderWidth: 1,
            }
          }}
          onClick={() => handleAnswerSelect(iIndex)}
        >
          {answer}
        </Button>
      ))}
    </Box>
  );
};

export default QuestionCard;