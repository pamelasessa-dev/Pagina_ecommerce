

const fs = require("fs");
const path = require("path");

// Ruta absoluta a la carpeta donde están TODOS los JSON de productos
const productsFolder = path.join(__dirname, "..", "json", "products");

module.exports = {

  // Obtener TODOS los productos
 
    getAll: () => {
        /**
         * 1.  todos los archivos dentro de /products/
         *    (ej: 40281.json, 50741.json, 50922.json, etc.)
         */
        const files = fs.readdirSync(productsFolder);

        /**
         * 2. se convierte cada archivo en un objeto usando JSON.parse
         *    y se devuelve en un array
         */
        const products = files.map(file => {
            const filePath = path.join(productsFolder, file);
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        });

        return products;
    },

    
    // Obtener un producto por ID
    
    getById: (id) => {
        /**
         * El ID coincide con el nombre del archivo:
         * Ejemplo: 50923.json - ID = "50923"
         */
        const fileName = id + ".json";
        const filePath = path.join(productsFolder, fileName);

        // Si no existe el archivo - devolvemos null
        if (!fs.existsSync(filePath)) {
            return null;
        }

        // Si existe - lo leemos y devolvemos su contenido
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    },
    
};