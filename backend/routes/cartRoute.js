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

module.exports = {
  emptyCart
};