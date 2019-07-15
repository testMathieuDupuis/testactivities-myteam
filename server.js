const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serverConfig = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes/authRoute')(app)
require('./routes/DiagnosticRoute')(app)
app.listen(serverConfig.port)
