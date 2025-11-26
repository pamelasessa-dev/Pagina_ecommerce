const fs = require("fs");
const path = require("path");

const buyFile = path.join(__dirname, "..", "json", "cart", "buy.json");

module.exports = {
    getBuyMessage: () => {
        const data = fs.readFileSync(buyFile, "utf-8");
        return JSON.parse(data);
    }
};