import Button from '@mui/material/Button';

const UtilButton = ({
  children,
  onClick,
  color = 'white',
  backgroundColor = 'black',
}) => {
  return (
    <Button
      sx={{
        backgroundColor: { backgroundColor },
        color: { color },
        width: '2.5 em',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#333',
        },
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default UtilButton;
