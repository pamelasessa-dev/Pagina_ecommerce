const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

router.get("/buy", cartController.buy);

module.exports = router;