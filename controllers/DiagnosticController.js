const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

module.exports = {
    async ping(req, res) {
        res.send("pong");
    }
}