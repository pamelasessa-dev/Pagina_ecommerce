const fs = require("fs");
const path = require("path");

const catsProductsFile = path.join(__dirname, "..", "json", "cats", "cats_products.json");

module.exports = {
    getAll: () => {
        const data = fs.readFileSync(catsProductsFile, "utf-8");
        return JSON.parse(data);
    },

    getProductsByCategory: (id) => {
        const data = module.exports.getAll();
        return data.find(cat => cat.id === id) || null;
    }
};