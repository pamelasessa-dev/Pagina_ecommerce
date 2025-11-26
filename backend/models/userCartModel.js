const fs = require("fs");
const path = require("path");

const userCartFile = path.join(__dirname, "..", "json", "user_cart", "user_cart.json");

module.exports = {
    getUserCart: () => {
        const data = fs.readFileSync(userCartFile, "utf-8");
        return JSON.parse(data);
    }
};