import React from 'react';
import { Button } from '@mui/material';

// Componente reutilizable para diferentes tipos de botones
const CustomButton = ({ text, onClick, color = 'primary', disabled = false, fullWidth = true, ...props }) => {
  return (
    <Button 
      variant="contained" 
      color={color} 
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ marginTop: '20px' }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
