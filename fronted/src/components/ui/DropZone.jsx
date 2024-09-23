import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import ErrorModal from '../modals/errorModal';

const Dropzone = ({ onDrop, onRemoveFile }) => {
  const [fileInfo, setFileInfo] = useState(null);
  const [openError, setOpenError] = useState(false); // Estado para controlar el modal de error

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setOpenError(true); // Mostrar modal de error si el archivo no es aceptado
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        setFileInfo({ name: file.name, type: file.type });
      }
      onDrop(acceptedFiles); // Informar al componente padre del archivo cargado
    },
  });

  const handleRemoveFile = (e) => {
    e.stopPropagation(); // Evitar que se dispare el evento de click en la dropzone
    setFileInfo(null); // Eliminar el archivo del estado
    onRemoveFile(); // Informar al componente padre que el archivo fue eliminado
  };

  const handleCloseError = () => {
    setOpenError(false); // Cerrar el modal de error
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        aspectRatio: '1 / 1',
        border: '2px dashed #1976d2',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        margin: '0 auto',
        minWidth: '300px',
        minHeight: '300px',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        Arrastre y suelte su archivo aquí, o haga clic para seleccionarlo
      </Typography>
      {fileInfo && (
        <Box mt={2} textAlign="center">
          <PictureAsPdfIcon sx={{ fontSize: 50, color: '#d32f2f' }} />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Archivo seleccionado:
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {fileInfo.name} ({fileInfo.type})
          </Typography>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleRemoveFile}
            sx={{ marginTop: '10px' }}
          >
            Eliminar archivo
          </Button>
        </Box>
      )}

      {/* Modal de error */}
      <ErrorModal open={openError} handleClose={handleCloseError} />
    </Box>
  );
};

export default Dropzone;
