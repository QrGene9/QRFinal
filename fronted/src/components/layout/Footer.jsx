import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          © 2024 Generador de QR
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Suba su archivo y obtenga un código QR
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
