import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

const QRCodeScanner = () => {
  const [file, setFile] = useState(null);
  const [scanResult, setScanResult] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/scan-qr`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setScanResult(response.data.qrCodeData);
      } catch (error) {
        console.error('Error al escanear el código QR:', error);
        setScanResult('Error al escanear el código QR.');
      }

      setFile(file);
    }
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Escanear código QR desde una imagen
      </Typography>

      {/* Contenedor de Dropzone y Botón de Selección */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '10px 20px',
            mb: 2,
            '&:hover': { backgroundColor: '#115293' },
          }}
        >
          Elegir archivo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>

        {/* Mostrar nombre del archivo */}
        {file && (
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Archivo seleccionado: {file.name}
          </Typography>
        )}

        {/* Botón para escanear */}
        <Button
          variant="contained"
          color="success"
          onClick={handleFileChange}
          sx={{ padding: '10px 20px' }}
          disabled={!file}
        >
          Escanear QR
        </Button>
      </Box>

      {/* Mostrar resultado del escaneo */}
      {scanResult && (
        <Box sx={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Resultado del escaneo:
          </Typography>
          <TextField
            value={scanResult}
            multiline
            rows={2}
            variant="outlined"
            sx={{ width: '100%', textAlign: 'center' }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default QRCodeScanner;
