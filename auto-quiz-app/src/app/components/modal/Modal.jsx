import React from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';

const CheckModal = ({ open, onClose, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: '#000',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Attention
        </Typography>
        <Typography
          id="modal-description"
          sx={{
            color: '#000',
            mb: 2,
          }}
        >
          {message}
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            color: '#fff',
            bgcolor: '#000',
            '&:hover': {
              bgcolor: '#333',
            },
            mt: 2,
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CheckModal;
