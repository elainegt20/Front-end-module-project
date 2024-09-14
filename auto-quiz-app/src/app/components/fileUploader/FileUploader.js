'use client';
import Link from 'next/link';
import React from 'react';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DisplayArea from '../QuizzDisplayArea/DisplayArea';
import axios from 'axios';

export default function FileUploader() {
  const [file, setFile] = React.useState(null);
  //const [data, setData] = React.useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const response = await axios.post('/api/upload', data);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();

      //setData(result.questions);

      // Store the data in local storage
      localStorage.setItem('data', JSON.stringify(result.questions));
      // Navigate to the QuizPage with query parameters
      console.log(result.questions);
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(data);
  return (
    <div>
      <Box
        sx={{
          p: 2,
          border: '1px dashed grey',
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload Your File
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            variant="outlined"
            normal
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Link href="/quizPage ">
            <Button type="submit" variant="contained" color="primary">
              Generate Quiz
            </Button>
          </Link>
        </form>
      </Box>
      {/* {data && <DisplayArea data={data} />} */}
    </div>
  );
}
