import React from 'react';
import { Box, Typography } from '@mui/material';

const QRCodeDisplay = ({ qrCode }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h6">Código QR Generado:</Typography>
      <img src={qrCode} alt="Código QR" style={{ marginTop: '10px' }} />
    </Box>
  );
};

export default QRCodeDisplay;
