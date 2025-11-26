const cartModel = require("../models/cartModel");

module.exports = {
    buy: (req, res) => {
        const message = cartModel.getBuyMessage();
        res.json(message);
    }
};