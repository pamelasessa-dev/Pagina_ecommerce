

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
    
    create: (productData) => {
        // 1. Leer todos los productos existentes
        const products = module.exports.getAll();
        // 2. Encontrar el ID máximo
        const ids = products.map(p => parseInt(p.id));
        const maxId = Math.max(...ids);
        // 3. Generar el nuevo ID +1
        const newId = maxId + 1;
        // 4. Crear el objeto completo
        const newProduct = {
            id: newId.toString(),
            ...productData
        };

        // 5. Ruta del nuevo archivo
        const newFilePath = path.join(productsFolder, `${newId}.json`);
        // 6. Guardar el JSON
        fs.writeFileSync(newFilePath, JSON.stringify(newProduct, null, 2));
        
        return newProduct;
    },

    //Actualizar un producto existente

    update: (id, updatedData) => {
        const filePath = path.join(productsFolder, `${id}.json`);

        if (!fs.existsSync(filePath)) return null;

        const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const updatedProduct = {
            ...existingData,
            ...updatedData,
            id: id // No se permite cambiar el id
        };

        fs.writeFileSync(filePath, JSON.stringify(updatedProduct, null, 2));

        return updatedProduct;
    },

    // Eliminar producto
    delete: (id) => {
        const filePath = path.join(productsFolder, `${id}.json`);

        if (!fs.existsSync(filePath)) return false;

        fs.unlinkSync(filePath);
        return true;
    }
};