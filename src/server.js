const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(helmet())

;(async function redisStart(){
    require('./redis/redisdb')(app)
})()

require('./control/index') (app)

const port = 1500 || process.env.PORT
app.listen(port, () => {
    console.log(`Magic happening on port ${port}`)
})