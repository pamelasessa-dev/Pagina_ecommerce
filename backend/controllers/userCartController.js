const userCartModel = require("../models/userCartModel");

module.exports = {
    getCart: (req, res) => {
        const cart = userCartModel.getUserCart();
        res.json(cart);
    }
};