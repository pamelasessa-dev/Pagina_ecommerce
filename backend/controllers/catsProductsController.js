const catsProductsModel = require("../models/catsProductsModel");

module.exports = {

    getByCategory: (req, res) => {
        const catId = req.params.id;

        const products = catsProductsModel.getByCategoryId(catId);

        if (!products) {
            return res.status(404).json({
                message: "Categoría no encontrada o sin productos"
            });
        }

        res.json(products);
    }
};