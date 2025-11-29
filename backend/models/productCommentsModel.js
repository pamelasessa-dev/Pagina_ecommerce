const fs = require("fs");
const path = require("path");

const commentsFolder = path.join(__dirname, "..", "json", "products_comments");

module.exports = {

    // Obtener todos los comentarios de un producto
    getByProductId: (productId) => {
        const filePath = path.join(commentsFolder, `${productId}.json`);

        if (!fs.existsSync(filePath)) {
            return []; // si no existe, no hay comentarios
        }

        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    },


};