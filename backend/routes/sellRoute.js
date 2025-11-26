const express = require("express");
const router = express.Router();
const sellController = require("../controllers/sellController");

router.get("/publish", sellController.publish);

module.exports = router;