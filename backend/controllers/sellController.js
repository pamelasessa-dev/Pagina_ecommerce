const sellModel = require("../models/sellModel");

module.exports = {
    publish: (req, res) => {
        const message = sellModel.getPublishMessage();
        res.json(message);
    }
};