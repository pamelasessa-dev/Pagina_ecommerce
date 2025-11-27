const express = require("express");
const router = express.Router();
const catsProductsModel = require("../models/catsProductsModel");

router.get("/:id/products", (req, res)=> {
    const id = parseInt (req.params.id);
    const result = catsProductsModel.getProductsByCategory(id);

    if(!result){
        return res.status(404).json({
            error: "La categoría no se ha encontrado"
        });
    }
    res.json(result);
});

module.exports = router;