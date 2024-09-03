// components/UploadForm.js

// 'use client';

// import { useState } from 'react';

// export default function UploadForm() {
//   const [file, setFile] = useState();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     try {
//       const data = new FormData();
//       data.set('file', file);

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       });

//       // Handle the error
//       if (!res.ok) throw new Error(await res.text());
//     } catch (e) {
//       // Handle errors here
//       console.error(e);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="file"
//         name="file"
//         onChange={(e) => setFile(e.target.files?.[0])}
//       />
//       <input type="submit" value="Upload" />
//     </form>
//   );
// }

'use client';

import React from 'react';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../styles.css';

export default function FileUploader() {
  const [file, setFile] = React.useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
        <Button type="sumit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </Box>
  );
}
