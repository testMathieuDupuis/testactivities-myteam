const serverless = require('serverless-http');
const server = require('./server');

module.exports.handler = serverless(server, {
    request: function (req, event, context) {
        // context.callbackWaitsForEmptyEventLoop = false;
        req.event = event;
        req.context = context;
    },
 });
