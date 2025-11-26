const fs = require("fs");
const path = require("path");

const publishFile = path.join(__dirname, "..", "json", "sell", "publish.json");

module.exports = {
    getPublishMessage: () => {
        const data = fs.readFileSync(publishFile, "utf-8");
        return JSON.parse(data);
    }
};