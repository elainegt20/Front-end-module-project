'use client';

import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Container,
} from '@mui/material';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

const ResultsPanel = ({ answers }) => {
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (answers) {
      try {
        // Convert answers into an array if it's not already
        const parsedAnswers = JSON.parse(decodeURIComponent(answers));
        // Log to check the structure
        console.log('Parsed answers:', parsedAnswers);

        //Convert to array if it's an object
        const answersArray = Array.isArray(parsedAnswers)
          ? parsedAnswers
          : Object.values(parsedAnswers);

        setResults(answersArray);
      } catch (error) {
        console.error('Error parsing answers:', error);
        setResults([]);
      }
    }
  }, [answers]);
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff' }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#000000' }}
        >
          Quiz Results
        </Typography>
        <List>
          {results &&
            results.map((result, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ flexDirection: 'column', py: 2 }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#000000' }}
                  >
                    {result.topic}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ color: '#000000' }}
                  >
                    {result.subtopic}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: '#f5f5f5',
                      p: 2,
                      borderRadius: 1,
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'bold', mb: 1, color: '#000000' }}
                    >
                      {result.question}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        backgroundColor: 'white',
                      }}
                    >
                      {result.yourAnswer === result.correctAnswer ? (
                        <CheckCircleOutline sx={{ color: '#000000', mr: 1 }} />
                      ) : (
                        <CancelOutlined sx={{ color: '#000000', mr: 1 }} />
                      )}
                      <ListItemText
                        primary="Your answer:"
                        secondary={result.yourAnswer}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 'bold',
                            color: '#000000',
                          },
                          '& .MuiListItemText-secondary': {
                            color: '#000000',
                            fontWeight:
                              result.yourAnswer === result.correctAnswer
                                ? 'bold'
                                : 'normal',
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ ml: 4 }}>
                      <ListItemText
                        primary="Correct answer:"
                        secondary={result.correctAnswer}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 'bold',
                            color: '#000000',
                          },
                          '& .MuiListItemText-secondary': {
                            fontWeight: 'bold',
                            color: '#000000',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </ListItem>
                {index < results.length - 1 && (
                  <Divider component="li" sx={{ bgcolor: '#000000' }} />
                )}
              </React.Fragment>
            ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ResultsPanel;
