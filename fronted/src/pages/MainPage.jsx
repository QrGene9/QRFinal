import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import Dropzone from '../components/ui/DropZone';
import QRCodeDisplay from '../components/ui/QRCodeDisplay';

const MainPage = () => {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState('');

  const handleFileDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleRemoveFile = () => {
    setFile(null); // Resetear el archivo para desactivar el botón de Generar QR
  };

  const handleSubmit = async () => {
    if (file) {
      console.log('Archivo seleccionado:', file);
      // Aquí se puede agregar la lógica para generar el QR basado en el archivo PDF
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Dropzone onDrop={handleFileDrop} onRemoveFile={handleRemoveFile} />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '20px' }}
        disabled={!file} // Deshabilitar si no hay archivo
      >
        Generar QR
      </Button>

      {qrCode && <QRCodeDisplay qrCode={qrCode} />}
    </Container>
  );
};

export default MainPage;
