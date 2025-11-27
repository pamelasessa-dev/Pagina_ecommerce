const productCommentsModel = require("../models/productCommentsModel");

module.exports = {

    // GET /products/:id/comments
    getComments: (req, res) => {
        const productId = req.params.id;
        const comments = productCommentsModel.getByProductId(productId);

        res.json(comments);
    },

    // POST /products/:id/comments
    addComment: (req, res) => {
        const productId = req.params.id;
        const newComment = req.body;

        const saved = productCommentsModel.addComment(productId, newComment);

        res.status(201).json({
            message: "Comentario agregado correctamente",
            comment: saved
        });
    }
};