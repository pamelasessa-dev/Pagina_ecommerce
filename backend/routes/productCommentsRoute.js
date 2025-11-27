const express = require("express");
const router = express.Router();
const productCommentsController = require("../controllers/productCommentsController");

// Obtener comentarios del producto
router.get("/:id/comments", productCommentsController.getComments);

// Agregar un comentario al producto
router.post("/:id/comments", productCommentsController.addComment);

module.exports = router;