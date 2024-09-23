import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Dropzone from '../components/ui/DropZone';
import QRCodeDisplay from '../components/ui/QRCodeDisplay';
import CustomButton from '../components/ui/Button';
import axios from 'axios';

const MainPage = () => {
  const [file, setFile] = useState(null); // Estado para el archivo
  const [qrCode, setQrCode] = useState(''); // Estado para almacenar el QR generado

  const handleFileDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]); // Guardar el archivo seleccionado
    setQrCode(''); // Limpiar el QR cuando se seleccione un nuevo archivo
  };

  const handleRemoveFile = () => {
    setFile(null); // Resetear el archivo para desactivar el botón de Generar QR
    setQrCode(''); // Resetear el QR si se elimina el archivo
  };

  const handleSubmit = async () => {
    if (file) {
      console.log('Archivo seleccionado:', file);
      
      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log("Enviando archivo al backend...");
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Código QR recibido del backend:', response.data.qrCodeData);

        // Establecer el código QR en el estado para mostrarlo
        setQrCode(response.data.qrCodeData);
      } catch (error) {
        console.error('Error al generar el código QR:', error);
      }
    }
  };

  const handleNewQRCode = () => {
    setFile(null); // Limpiar el archivo
    setQrCode(''); // Limpiar el código QR
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <Box sx={{ marginBottom: '30px' }}>
        <Dropzone onDrop={handleFileDrop} onRemoveFile={handleRemoveFile} file={file} /> {/* Pasamos el archivo actual para que se pueda limpiar */}
      </Box>

      {/* Botón para generar el QR */}
      <CustomButton
        text="Generar QR"
        onClick={handleSubmit}
        disabled={!file} // Deshabilitar si no hay archivo
      />

      {/* Mostrar el QR generado */}
      {qrCode && (
        <>
          <QRCodeDisplay qrCode={qrCode} />
          
          {/* Botón para generar un nuevo QR */}
          <CustomButton
            text="Generar un nuevo QR"
            onClick={handleNewQRCode}
            color="secondary"
            fullWidth={false} // Para que no ocupe todo el ancho
            sx={{ marginTop: '20px' }}
          />
        </>
      )}
    </Container>
  );
};

export default MainPage;
