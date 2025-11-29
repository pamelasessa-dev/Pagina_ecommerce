const productCommentsModel = require("../models/productCommentsModel");

module.exports = {

    // GET /products/:id/comments
    getComments: (req, res) => {
        const productId = req.params.id;
        const comments = productCommentsModel.getByProductId(productId);

        res.json(comments);
    },

};