import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FileDownloadPage = () => {
  const { fileName } = useParams();
  const [isDownloaded, setIsDownloaded] = React.useState(false); // Estado para verificar si la descarga se realizó
  const [loading, setLoading] = React.useState(true); // Estado para el proceso de descarga

  React.useEffect(() => {
    const downloadFile = async () => {
      try {
        console.log('Iniciando la solicitud de descarga al backend...');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/download/${fileName}`, {
          responseType: 'blob', // Necesario para manejar archivos binarios
        });

        console.log('Respuesta recibida del backend:', response);

        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Archivo descargado con éxito.');
        setIsDownloaded(true); // Marca la descarga como exitosa
      } catch (error) {
        console.error('Error al intentar descargar el archivo:', error);
      } finally {
        setLoading(false); // Detener el estado de carga al finalizar
      }
    };

    downloadFile();
  }, [fileName]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      {loading ? (
        <>
          <CircularProgress /> {/* Spinner mientras descarga */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Descargando archivo...
          </Typography>
        </>
      ) : (
        <>
          {isDownloaded ? (
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> {/* Ícono de éxito */}
              <Typography variant="h5" sx={{ mt: 2, color: 'green' }}>
                Descarga solicitada con éxito
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: 'grey' }}>
                Tu archivo {fileName} se está descargando.
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" color="error">
              Hubo un error al intentar descargar el archivo.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default FileDownloadPage;
