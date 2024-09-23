const express = require('express');
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
  },
});

const upload = multer({ storage });

// Hacer que la carpeta 'uploads' sea accesible públicamente
app.use('/uploads', express.static('uploads'));

// Ruta para subir el archivo y generar un QR con la URL del archivo
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileName = req.file.filename; // Nombre del archivo subido
    const fileUrl = `http://localhost:${PORT}/uploads/${fileName}`; // URL pública del archivo

    console.log('Archivo recibido en el backend:', fileName);
    console.log('URL del archivo:', fileUrl);

    // Generar el código QR basado en la URL del archivo
    const qrCodeData = await QRCode.toDataURL(fileUrl);

    console.log('Código QR generado en el backend:', qrCodeData);

    res.json({ qrCodeData }); // Enviar el código QR al frontend
  } catch (error) {
    console.error('Error al generar el QR:', error);
    res.status(500).send('Error al generar el código QR');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
