import React, { useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import Dropzone from '../components/ui/DropZone';
import QRCodeDisplay from '../components/ui/QRCodeDisplay';
import CustomButton from '../components/ui/Button';
import axios from 'axios';
import ErrorModal from '../components/modals/errorModal'; // Importar el modal de error

const MainPage = () => {
  const [file, setFile] = useState(null); // Estado para el archivo
  const [qrCode, setQrCode] = useState(''); // Estado para almacenar el QR generado
  const [loading, setLoading] = useState(false); // Estado para controlar el gif de carga
  const [message, setMessage] = useState(''); // Estado para el mensaje (Generando QR)
  const [openError, setOpenError] = useState(false); // Estado para abrir el modal de error
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleFileDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]); // Guardar el archivo seleccionado
    setQrCode(''); // Limpiar el QR cuando se seleccione un nuevo archivo
    setMessage(''); // Limpiar el mensaje
  };

  const handleRemoveFile = () => {
    setFile(null); // Resetear el archivo para desactivar el botón de Generar QR
    setQrCode(''); // Resetear el QR si se elimina el archivo
    setMessage(''); // Limpiar el mensaje
  };

  const handleSubmit = async () => {
    if (file) {
      setLoading(true); // Activar la animación de carga
      setMessage('Generando QR...'); // Mostrar el mensaje de "Generando QR"

      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log("Enviando archivo al backend...");
        const response = await axios.post('https://qrfinal-vd6b.onrender.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Código QR recibido del backend:', response.data.qrCodeData);

        // Establecer el código QR en el estado para mostrarlo
        setQrCode(response.data.qrCodeData);
        setMessage('QR generado exitosamente');
      } catch (error) {
        console.error('Error al generar el código QR:', error);
        setErrorMessage('Error al generar el QR. Inténtalo nuevamente.');
        setOpenError(true); // Abrir el modal de error
      } finally {
        setLoading(false); // Desactivar la animación de carga
      }
    }
  };

  const handleNewQRCode = () => {
    setFile(null); // Limpiar el archivo
    setQrCode(''); // Limpiar el código QR
    setMessage(''); // Limpiar el mensaje
  };

  const handleCloseError = () => {
    setOpenError(false); // Cerrar el modal de error
    setErrorMessage(''); // Limpiar el mensaje de error
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
        disabled={!file || loading} // Deshabilitar si no hay archivo o si está cargando
      />

      {/* Mostrar el gif de carga y mensaje mientras se genera el QR */}
      {loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress /> {/* Spinner de Material UI */}
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            {message}
          </Typography>
        </Box>
      )}

      {/* Mostrar el QR generado */}
      {!loading && qrCode && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <QRCodeDisplay qrCode={qrCode} />
          
          {/* Botón para generar un nuevo QR */}
          <CustomButton
            text="Generar un nuevo QR"
            onClick={handleNewQRCode}
            color="secondary"
            fullWidth={false} // Para que no ocupe todo el ancho
            sx={{ marginTop: '20px' }}
          />
        </Box>
      )}

      {/* Mostrar mensaje de error o éxito */}
      {!loading && message && !qrCode && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body1" color="error">
            {message}
          </Typography>
        </Box>
      )}

      {/* Modal de error */}
      <ErrorModal open={openError} handleClose={handleCloseError} errorMessage={errorMessage} />
    </Container>
  );
};

export default MainPage;
