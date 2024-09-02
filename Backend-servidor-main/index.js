const express = require ('express'); // Importamos Express para crear el servidor
const conectarDB = require('./config/db'); // Importamos la función para conectar a la base de datos
const cors = require("cors"); // Importamos CORS para permitir solicitudes entre dominios

// Creamos una instancia de Express
const app = express();

// Conectamos a la base de datos
conectarDB();

// Habilitamos CORS
app.use(cors());

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

// Definimos las rutas para los productos
app.use('/api/productos', require('./routes/producto'));

// Iniciamos el servidor en el puerto 4000
app.listen(4000, () => {
    console.log('El servidor está corriendo perfectamente');
});
