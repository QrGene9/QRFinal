const fs = require('fs');
const path = require('path');

// Límite de espacio en bytes (800 MB en este ejemplo)
const MAX_STORAGE_SIZE = 800 * 1024 * 1024; // 800 MB
const DELETE_SIZE = 300 * 1024 * 1024; // 200 MB a eliminar

// Función para obtener el tamaño total de la carpeta 'uploads'
const getDirectorySize = (directory) => {
  const files = fs.readdirSync(directory);
  let totalSize = 0;

  files.forEach((file) => {
    const stats = fs.statSync(path.join(directory, file));
    totalSize += stats.size;
  });

  console.log(`El tamaño total de la carpeta es de ${totalSize / (1024 * 1024)} MB.`);
  return totalSize;
};

// Función para eliminar los archivos más antiguos hasta reducir el espacio
const removeOldestFiles = (directory) => {
  const files = fs.readdirSync(directory)
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(directory, file)).mtime.getTime(),
      size: fs.statSync(path.join(directory, file)).size
    }))
    .sort((a, b) => a.time - b.time); // Ordenar de más antiguo a más reciente

  let spaceFreed = 0;

  // Eliminar archivos hasta liberar al menos DELETE_SIZE de espacio
  while (getDirectorySize(directory) > MAX_STORAGE_SIZE - DELETE_SIZE && files.length > 0) {
    const oldestFile = files.shift(); // Obtener el archivo más antiguo
    const filePath = path.join(directory, oldestFile.name);
    spaceFreed += oldestFile.size;
    fs.unlinkSync(filePath); // Eliminar el archivo
    console.log(`Archivo eliminado: ${oldestFile.name}`);
    
    if (spaceFreed >= DELETE_SIZE) {
      break;
    }
  }

  console.log(`Se liberaron ${spaceFreed / (1024 * 1024)} MB de espacio.`);
};

// Exportar las funciones
module.exports = {
  getDirectorySize,
  removeOldestFiles,
};
