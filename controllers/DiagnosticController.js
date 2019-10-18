const request = require('request');

module.exports = {
    async ping(req, res) {
        res.send("pong");
    }
}