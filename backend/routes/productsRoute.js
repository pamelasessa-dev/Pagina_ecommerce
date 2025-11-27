const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getById);

module.exports = productsRouter;