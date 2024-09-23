import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const QRCodeDisplay = ({ qrCode }) => {
  const [fileName, setFileName] = useState('codigo-qr'); // Nombre del archivo por defecto

  // Función para manejar la descarga de la imagen
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode; // Asignar el código QR como imagen
    link.download = `${fileName || 'codigo-qr'}.png`; // Usar el nombre del archivo si está disponible
    link.click();
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '30px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
      <DoneOutlineIcon sx={{ fontSize: 50, color: 'green' }} /> {/* Icono de éxito */}
      <Typography variant="h5" sx={{ marginTop: '10px', fontWeight: 'bold' }}>¡Código QR Generado con éxito!</Typography>
      <img src={qrCode} alt="Código QR" style={{ marginTop: '20px', width: '400px', height: '400px' }} />
      
      <Box sx={{ marginTop: '20px' }}>
        <TextField 
          label="Nombre del archivo" 
          variant="outlined" 
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          sx={{ marginBottom: '10px' }}
        />
        <Button 
          variant="contained" 
          color="secondary" 
          sx={{ marginLeft: '10px' }} 
          onClick={handleDownload} // Descargar QR al hacer clic
        >
          Descargar Código QR
        </Button>
      </Box>
    </Box>
  );
};

export default QRCodeDisplay;
