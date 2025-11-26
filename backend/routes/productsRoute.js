const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getById);
productsRouter.post("/", productsController.create);
productsRouter.put("/:id",productsController.update);
productsRouter.delete("/:id", productsController.remove);

module.exports = productsRouter;