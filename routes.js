const express = require('express')
const routes = express.Router()

const AuthController = require('./src/controllers/AuthController')

routes.post('/auth/register', AuthController.register)

module.exports = routes