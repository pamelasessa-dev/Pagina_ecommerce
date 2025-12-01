const express = require("express");
const router = express.Router();
const cartModel = require("../models/cartModel");

const emptyCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await cartModel.emptyCart(userId);
    res.status(200).json({ message: 'Cart emptied' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error emptying cart' });
  }
};

router.post("/:userId/empty", emptyCart);

module.exports = router;