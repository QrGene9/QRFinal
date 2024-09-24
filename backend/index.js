const express = require('express');
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs');
const cors = require('cors');
const { getDirectorySize, removeOldestFiles } = require('./functions/fileManager'); // Importar las funciones

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Crear la carpeta 'uploads' si no existe
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR);
    }
    cb(null, UPLOADS_DIR); // Carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
  },
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Ruta para subir el archivo y generar un QR con la URL de descarga
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No se ha proporcionado ningún archivo');
    }

    // Comprobar el tamaño de la carpeta y eliminar archivos antiguos si es necesario
    const currentSize = getDirectorySize(UPLOADS_DIR);
    if (currentSize > 800 * 1024 * 1024) { // Si supera 800 MB
      removeOldestFiles(UPLOADS_DIR); // Eliminar los más antiguos hasta reducir 200 MB
    }

    const fileName = req.file.filename; // Nombre del archivo subido
    const fileUrl = `${req.protocol}://${req.get('host')}/download/${fileName}`; // URL para descargar el archivo

    // Generar el código QR basado en la URL del archivo
    const qrCodeData = await QRCode.toDataURL(fileUrl);

    res.json({ qrCodeData }); // Enviar el código QR al frontend
  } catch (error) {
    console.error('Error al subir el archivo o generar el código QR:', error.message);
    res.status(500).json({ error: 'Error al subir el archivo o generar el código QR', details: error.message });
  }
});

// Ruta para descargar el archivo y forzar la descarga
app.get('/download/:fileName', (req, res) => {
  try {
    const filePath = path.join(UPLOADS_DIR, req.params.fileName);

    // Verifica si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Forzar la descarga del archivo
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.fileName}"`);
    res.download(filePath, req.params.fileName, (err) => {
      if (err) {
        console.error('Error al descargar el archivo:', err.message);
        return res.status(500).json({ error: 'Error al descargar el archivo', details: err.message });
      }
    });
  } catch (error) {
    console.error('Error durante la descarga del archivo:', error.message);
    res.status(500).json({ error: 'Error inesperado durante la descarga del archivo', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de generación de QR');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
