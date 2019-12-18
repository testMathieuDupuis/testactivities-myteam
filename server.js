const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet') //protect againts known vulnerability
const server = express()
const configs = require("./config/config")({});

server.use(morgan('combined'))
server.use(express.urlencoded({ extended: true, strict: false })); //serverless
server.use(bodyParser.json())
server.use(cors())
server.use(helmet())

const session = require('express-session');
const DynamoStore = require('connect-dynamodb-session')(session);
server.use(session({
    cookie: { maxAge: configs.cookie_age },
    secret: configs.session_secret,
    store: new DynamoStore({
        region: configs.aws_region,
        tableName: configs.tables.session,
        autoCreate: true
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

require('./routes/DiagnosticRoute')(server)
require('./routes/authRoute')(server)
require('./routes/uploadRoute')(server)
require('./routes/projectRoute')(server)

module.exports = server;

if (configs.isLambda == 0) 
{
    console.log("Start as standalone host: localhost:"+configs.port)
    server.listen(configs.port)
}
else
    console.log("Start as serverless")

