import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, Typography, Button } from '@mui/material';

const QrReaderComponent = () => {
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      setError(null); // Reiniciar error si la lectura fue exitosa
    }
  };

  const handleError = (err) => {
    console.error('Error leyendo el QR:', err);
    setError('Error al escanear el código QR, intenta nuevamente.');
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h5">Escanea un código QR</Typography>

      <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result?.text);
            }
            if (error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '300px' }}
        />
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}

      {qrData && (
        <Box mt={4}>
          <Typography variant="h6" color="primary">
            ¡Datos del QR escaneado!
          </Typography>
          <Typography variant="subtitle1">{qrData}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default QrReaderComponent;
