const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/authenticate', authenticate)

function generateToken(params = {}) {
    return jwt.sign(params, config.secret, {
        expiresIn: 86400
    })
}

async function register(req, res) {
    try {
        const { email } = req.body
        if (await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exists'})
        const user = await User.create(req.body)
        user.password = undefined
        return res.send({ 
            user,
            token: generateToken({ id: user.id })
        })
    } catch (err) {
        return res.status(400).send({error: 'Registration failed'})
    }
}

async function authenticate(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')
        if (!user)
        return res.status(400).send({ error: 'User not exists'})
        
        if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password'})

        user.password = undefined
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })
        res.send({ 
            user,
            token: generateToken({ id: user.id }) 
        })
    } catch (err) {
        return res.status(400).send({error: 'Authentication failed'})
    }
}

module.exports = app => app.use('/auth', router)