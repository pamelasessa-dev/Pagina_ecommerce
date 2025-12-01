const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Vaciar carrito
router.delete("/:userId", cartController.emptyCart);

module.exports = router;