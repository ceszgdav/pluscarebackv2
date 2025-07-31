import express, { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router: Router = express.Router();

// Obtén la ruta completa de la carpeta actual
const currentFolder: string = __dirname;

// Lee todos los archivos en la carpeta actual
fs.readdirSync(currentFolder).forEach((file) => {
  const filePath: string = path.join(currentFolder, file);
  // Verifica si el archivo es un directorio
  if (fs.lstatSync(filePath).isDirectory()) {
    // Carga las rutas del directorio actual
    const routes: Router = require(filePath).default;
    // Obtén el nombre del directorio para definir el prefijo de la ruta
    const routeName: string = path.basename(filePath);
    // Agrega las rutas al router utilizando el prefijo correspondiente
    router.use(`/${routeName}`, routes);
  }
});

export default router;
