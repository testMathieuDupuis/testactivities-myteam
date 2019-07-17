const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serverConfig = require('./config/config')

const app = express()

const session = require('express-session');
const DynamoStore = require('connect-dynamodb-session')(session);
app.use(session({
    cookie: { maxAge: 1209600000 },
    secret: 'PFE2019_RATIO',
    store: new DynamoStore({
        region: 'ca-central-1',
        tableName: 'ratio_session',
        autoCreate: true
    })
}));

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes/authRoute')(app)
require('./routes/uploadRoute')(app)
require('./routes/projectRoute')(app)

app.listen(serverConfig.port)