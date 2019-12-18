const request = require('request');

module.exports = {
    async ping(req, res) {
        var config = require("../config/config")(req);
        
        //IDEA if VPN filter by IP with event.headers."X-Forwarded-For": "sourceIP, relay ...",
        if(config.diag==1)
            res.send(JSON.stringify(config,null,2));
        else
            res.send("pong");
    }
}