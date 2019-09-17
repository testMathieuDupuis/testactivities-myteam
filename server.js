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

require('./routes/authRoute')(server)
require('./routes/DiagnosticRoute')(server)

module.exports = server;

if (typeof module.exports.isLambda === "undefined") 
{
    console.log("Start as standalone")
    server.listen(serverConfig.port)
}
else
    console.log("Start as serverless")

