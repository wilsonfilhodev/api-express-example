const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')


mongoose.connect(config.db.uri, { useNewUrlParser: true })

const app = express()

app.use(cors())
app.use(express.json())
require('./src/controllers/AuthController')(app)
require('./src/controllers/ProjectController')(app)

app.listen(config.port, () => {
    console.log('Server runing in port ',config.port)
})