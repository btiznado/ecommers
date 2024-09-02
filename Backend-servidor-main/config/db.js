const mongoose = require('mongoose'); // Importamos mongoose para interactuar con MongoDB
require('dotenv').config({ path: 'variables.env' }); // Importamos dotenv para cargar las variables de entorno desde un archivo

// Función para conectar a la base de datos MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            // useNewUrlParser: true, // (Actualmente obsoleto)
            // useUnifiedTopology: true, // (Actualmente obsoleto)
            // useFindAndModify: true // (Actualmente obsoleto)
        }); // Conectamos a la base de datos utilizando la URL de conexión de la variable de entorno DB_MONGO
        console.log('BD Conectada'); // Imprimimos un mensaje de confirmación si la conexión es exitosa
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la conexión
        process.exit(1); // Detenemos la aplicación si ocurre un error grave de conexión
    }
}

module.exports = conectarDB; // Exportamos la función conectarDB para que pueda ser utilizada en otros archivos
