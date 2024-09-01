// Importamos express para definir las rutas del producto
const express = require('express');
const router = express.Router(); // Creamos un enrutador de express
const productoController = require('../controllers/productoController'); // Importamos el controlador de productos

// Definimos las rutas para las operaciones CRUD de productos

// Ruta para crear un nuevo producto (POST)
router.post('/', productoController.crearProducto);

// Ruta para obtener todos los productos (GET)
router.get('/', productoController.obtenerProductos);

// Ruta para actualizar un producto existente por su ID (PUT)
router.put('/:id', productoController.actualizarProducto);

// Ruta para obtener los detalles de un producto por su ID (GET)
router.get('/:id', productoController.obtenerProducto);

// Ruta para eliminar un producto por su ID (DELETE)
router.delete('/:id', productoController.eliminarProducto);

module.exports = router; // Exportamos las rutas del producto para su uso en otros archivos
