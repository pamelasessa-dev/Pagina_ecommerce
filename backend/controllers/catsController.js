const catsModel = require ("../models/catsModel");

module.exports = {

    getAll: (req, res) => {
        const cats = catsModel.getAll();
        res.json(cats);
    },

    getById: (req, res) => {
        const id = req.params.id;
        const cat = catsModel.getById(id);

        if(!cat){
            return res.status(404).json({
                message: "No se ha encontrado la categoría"
            });
        }
        res.json(cat);

    }
};