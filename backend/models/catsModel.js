const fs = require("fs");
const path = require("path");

//Ruta al archivo cat.json
const catsFile = path.join(__dirname, "..", "json", "cats", "cat.json");

module.exports = {
    //obtener todas las categorías
    getAll:()=> {
        const data = fs.readFileSync(catsFile, "utf-8");
        return JSON.parse(data);
    },
    //obtener una categoría por ID
    getById: (id) => {
        const cats = module.exports.getAll();
        const numId = parseInt(id);
        
        return cats.find(c => c.id === numId) || null;
    }
};