const mongoose = require('mongoose'); // Importamos mongoose para definir esquemas y modelos

// Definimos el esquema del Producto
const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true // El nombre del producto es obligatorio
    },
    categoria: {
        type: String,
        required: true // La categoría del producto es obligatoria
    },
    ubicacion: {
        type: String,
        required: true // La ubicación del producto es obligatoria
    },
    precio: {
        type: Number,
        required: true // El precio del producto es obligatorio
    },
    fechaCreacion: {
        type: Date,
        default: Date.now() // La fecha de creación del producto se establece automáticamente al momento de crearlo
    }
});

module.exports = mongoose.model('Producto', ProductoSchema); // Exportamos el modelo Producto creado a partir del esquema
