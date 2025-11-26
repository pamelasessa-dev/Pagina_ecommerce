const express = require("express");
const router = express.Router();
const userCartController = require("../controllers/userCartController");

router.get("/", userCartController.getCart);

module.exports = router;