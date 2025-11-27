// Importamos el modelo, que se encargará de leer los archivos JSON
const productsModel = require("../models/productsModel");

module.exports = {

    // Obtener TODOS los productos
    
    getAll: (req, res) => {
        /**
         * Le pedimos al modelo que nos devuelva la lista completa
         * de productos. El modelo se encarga de leer el archivo JSON.
         */
        const products = productsModel.getAll();

        // Enviamos la lista al frontend como JSON
        res.json(products);
    },

    
    // Obtener un producto por ID
    
    getById: (req, res) => {

        /**
         * Tomamos el parámetro ID que viene en la URL.
         * Ejemplo: /products/50804  - req.params.id === "50804"
         */
        const id = req.params.id;

        /**
         * Llamamos al modelo para que busque ese producto.
         */
        const product = productsModel.getById(id);

        if (product) {
            // Si existe, lo devolvemos como JSON
            res.json(product);
        } else {
            // Si no existe, devolvemos error 404
            res.status(404).json({ message: "Producto no encontrado" });
        }
    },
    
};
