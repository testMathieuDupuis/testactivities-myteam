const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serverConfig = require('./config/config')
const helmet = require('helmet') //protect againts known vulnerability
const server = express()

server.use(morgan('combined'))
server.use(express.urlencoded({ extended: true, strict: false })); //serverless
server.use(bodyParser.json())
server.use(cors())
server.use(helmet())

const session = require('express-session');
const DynamoStore = require('connect-dynamodb-session')(session);
server.use(session({
    cookie: { maxAge: serverConfig.cookie_age },
    secret: serverConfig.session_secret,
    store: new DynamoStore({
        region: serverConfig.aws_region,
        tableName: serverConfig.tables.session,
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

