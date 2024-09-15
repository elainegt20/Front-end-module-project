'use client';

import React from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'





const Results = () => {

    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        const fetchResults = () => {
          const storedResults = localStorage.getItem('Results'); // Make sure this key matches the one used in FileUploader
          if (storedResults) {
            try {
              const parsedResults = JSON.parse(storedResults);
                setResults(parsedResults);
                console.log(parsedResults);
            } catch (error) {
              console.error('Error parsing stored results:', error);
              setResults([]);
            }
          }
        };
    
        fetchResults();
    
        // Add event listener for storage changes
        window.addEventListener('storage', fetchResults);
    
        // Cleanup function
        return () => {
          window.removeEventListener('storage', fetchResults);
        };
      }, []);
    return (
        <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
            Quiz Results
          </Typography>
          <List>
            {results && results.map((result, index) => (
                <div key={index}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mt: 2 }}>
                    {result.topic}
                    </Typography>
            
                    <div>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'text.primary', mt: 2 }}>
                        {result.subtopic}
                        </Typography>
                        
                        <div>
                            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                                {result.question}
                            </Typography>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: 'error.main' }}>
                                {result.yourAnswer === result.correctAnswer ? <Check /> : <Close />}
                            </ListItemIcon>
                            <ListItemText
                                primary="Your answer:"
                                secondary={result.yourAnswer}
                                sx={{
                                '& .MuiListItemText-primary': { color: 'text.primary' },
                                '& .MuiListItemText-secondary': { color: 'text.secondary' },
                                }}
                            />
                            <ListItemText
                                primary={`Correct answer: ${result.correctAnswer}`}
                                sx={{
                                '& .MuiListItemText-primary': { color: 'text.primary' },
                                '& .MuiListItemText-secondary': { color: 'text.secondary' },
                                }}
                            />
                            </ListItem>
                            {index < results.length - 1 && <Divider variant="fullWidth" component="li" />}
                        </div>
                        
                    </div>
                    
              </div>
            ))}
          </List>
        </Paper>
      )
}

export default Results