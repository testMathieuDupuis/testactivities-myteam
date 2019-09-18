const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serverConfig = require('./config/config')
const server = express()

server.use(morgan('combined'))
server.use(express.urlencoded({ extended: true, strict: false })); //serverless
server.use(bodyParser.json())
server.use(cors())

const session = require('express-session');
const DynamoStore = require('connect-dynamodb-session')(session);
server.use(session({
    cookie: { maxAge: 1209600000 },
    secret: 'PFE2019_RATIO',
    store: new DynamoStore({
        region: 'ca-central-1',
        tableName: 'ratio_session',
        autoCreate: true
    })
}));

require('./routes/DiagnosticRoute')(server)
require('./routes/authRoute')(server)
require('./routes/uploadRoute')(server)
require('./routes/projectRoute')(server)

module.exports = server;

if (typeof module.exports.isLambda === "undefined") 
{
    console.log("Start as standalone")
    server.listen(serverConfig.port)
}
else
    console.log("Start as serverless")

