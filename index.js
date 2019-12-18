const serverless = require('serverless-http');
const server = require('./server');

module.exports.handler = serverless(server, {
        request: function (req, event, context) {
            // context.callbackWaitsForEmptyEventLoop = false;
            //console.log("Event",JSON.stringify(event, null, 2));
            //console.log("Context",JSON.stringify(context, null, 2));
            
            req.event = event;
            req.context = context;
        }
    });
