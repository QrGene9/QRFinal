const express = require('express');
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs');
const cors = require('cors');
const { getDirectorySize, removeOldestFiles } = require('./functions/fileManager');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const CUSTOM_DOMAIN = process.env.BACKEND_URL || 'https://qrfinal-vd6b.onrender.com';

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR);
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Ruta para subir el archivo y generar un QR con la URL de descarga directa
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No se ha proporcionado ningún archivo');
    }

    const currentSize = getDirectorySize(UPLOADS_DIR);
    if (currentSize > 800 * 1024 * 1024) {
      removeOldestFiles(UPLOADS_DIR);
    }

    const fileName = req.file.filename;

    // Generar la URL del backend utilizando la variable de entorno CUSTOM_DOMAIN
    const fileUrl = `${CUSTOM_DOMAIN}/download/${fileName}`;

    // Generar el código QR basado en la URL del backend
    const qrCodeData = await QRCode.toDataURL(fileUrl);

    res.json({ qrCodeData });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo o generar el código QR' });
  }
});

// Ruta para descargar el archivo directamente
app.get('/download/:fileName', (req, res) => {
  try {
    const filePath = path.join(UPLOADS_DIR, req.params.fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Descargar el archivo automáticamente
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.fileName}"`);
    res.download(filePath, req.params.fileName, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al descargar el archivo' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado durante la descarga del archivo' });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor en línea!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
