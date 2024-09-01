import { APP_BASE_HREF } from '@angular/common'; // Importamos APP_BASE_HREF para establecer la ruta base de la aplicación Angular
import { CommonEngine } from '@angular/ssr'; // Importamos CommonEngine para el renderizado del servidor
import express from 'express'; // Importamos express para la creación del servidor Express
import { fileURLToPath } from 'node:url'; // Importamos fileURLToPath para convertir una URL en una ruta de archivo
import { dirname, join, resolve } from 'node:path'; // Importamos dirname, join y resolve para trabajar con rutas de archivos
import AppServerModule from './src/main.server'; // Importamos AppServerModule, el módulo del servidor de la aplicación Angular

// La aplicación Express se exporta para que pueda ser utilizada por funciones serverless.
export function app(): express.Express {
  const server = express(); // Creamos una nueva instancia de servidor Express
  const serverDistFolder = dirname(fileURLToPath(import.meta.url)); // Obtenemos la carpeta de distribución del servidor
  const browserDistFolder = resolve(serverDistFolder, '../browser'); // Obtenemos la carpeta de distribución del navegador
  const indexHtml = join(serverDistFolder, 'index.server.html'); // Obtenemos la ruta del archivo HTML de la aplicación Angular

  const commonEngine = new CommonEngine(); // Creamos una nueva instancia de CommonEngine para el renderizado del servidor

  server.set('view engine', 'html'); // Configuramos el motor de vistas para usar archivos HTML
  server.set('views', browserDistFolder); // Establecemos la carpeta de vistas para el servidor Express

  // Servimos archivos estáticos desde la carpeta /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y' // Establecemos la duración máxima de la caché para los archivos estáticos
  }));

  // Todas las rutas regulares utilizan el motor Angular
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req; // Extraemos información de la solicitud

    commonEngine
      .render({
        bootstrap: AppServerModule, // Especificamos el módulo del servidor de la aplicación Angular para el bootstrap
        documentFilePath: indexHtml, // Especificamos la ruta del archivo HTML de la aplicación Angular
        url: `${protocol}://${headers.host}${originalUrl}`, // Construimos la URL completa de la solicitud
        publicPath: browserDistFolder, // Especificamos la carpeta de distribución del navegador
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }], // Especificamos los proveedores para la inyección de dependencias
      })
      .then((html) => res.send(html)) // Enviamos la respuesta HTML generada por el motor Angular
      .catch((err) => next(err)); // Manejamos cualquier error que ocurra durante el renderizado
  });

  return server; // Retornamos el servidor Express configurado
}

function run(): void {
  const port = process.env['PORT'] || 4000; // Obtenemos el puerto del entorno o usamos el puerto 4000 por defecto

  // Iniciamos el servidor Node
  const server = app(); // Creamos la instancia del servidor Express
  server.listen(port, () => { // Escuchamos las conexiones en el puerto especificado
    console.log(`Node Express server listening on http://localhost:${port}`); // Imprimimos un mensaje de confirmación
  });
}

run(); // Ejecutamos la función run para iniciar el servidor
