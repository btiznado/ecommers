const Producto = require("../models/Producto"); // Importamos el modelo Producto para interactuar con la base de datos

// Función para crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        let producto; // Declaramos una variable para almacenar el producto creado

        // Creamos nuestro producto utilizando los datos recibidos en el cuerpo de la solicitud
        producto = new Producto(req.body);

        // Guardamos el producto en la base de datos
        await producto.save();

        // Enviamos el producto creado como respuesta
        res.send(producto);
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la creación del producto
        res.status(500).send('Hubo un error'); // Enviamos un mensaje de error en caso de fallar la creación del producto
    }
}

// Función para obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        // Obtenemos todos los productos de la base de datos
        const productos = await Producto.find();

        // Enviamos la lista de productos como respuesta
        res.json(productos);
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la obtención de los productos
        res.status(500).send('Hubo un error'); // Enviamos un mensaje de error en caso de fallar la obtención de los productos
    }
}

// Función para actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body; // Extraemos los datos del producto a actualizar
        let producto = await Producto.findById(req.params.id); // Buscamos el producto por su ID

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' }); // Verificamos si el producto no existe y enviamos un mensaje de error
        }

        // Actualizamos los datos del producto
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        // Guardamos los cambios en la base de datos
        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });

        // Enviamos el producto actualizado como respuesta
        res.json(producto);
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la actualización del producto
        res.status(500).send('Hubo un error'); // Enviamos un mensaje de error en caso de fallar la actualización del producto
    }
}

// Función para obtener los detalles de un producto específico
exports.obtenerProducto = async (req, res) => {
    try {
        // Buscamos el producto por su ID
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' }); // Verificamos si el producto no existe y enviamos un mensaje de error
        }

        // Enviamos los detalles del producto como respuesta
        res.json(producto);
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la obtención de los detalles del producto
        res.status(500).send('Hubo un error'); // Enviamos un mensaje de error en caso de fallar la obtención de los detalles del producto
    }
}

// Función para eliminar un producto existente
exports.eliminarProducto = async (req, res) => {
    try {
        // Buscamos el producto por su ID y lo eliminamos de la base de datos
        await Producto.findOneAndDelete({ _id: req.params.id });

        // Enviamos un mensaje de éxito como respuesta
        res.json({ msg: 'Producto eliminado con exito' });
    } catch (error) {
        console.log(error); // Imprimimos cualquier error que ocurra durante la eliminación del producto
        res.status(500).send('Hubo un error'); // Enviamos un mensaje de error en caso de fallar la eliminación del producto
    }
}
