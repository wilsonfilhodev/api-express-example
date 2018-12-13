const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const mailer = require('../modules/mailer')

router.post('/register', register)
router.post('/authenticate', authenticate)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

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

async function forgotPassword(req, res) {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user)
            return res.status(400).send({ error: 'User not exists'})

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findOneAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })
        
        mailer.sendMail({
            to: email,
            from: 'will.filho27@gmail.com',
            template: 'auth/forgot-password',
            context: { token }
        }, (error) => {
            if (error)
                return res.status(400).send({ error: 'Cannot send forgot email send'})
            
            return res.send()
        })
    } catch (error) {
        res.status(400).send({ error: 'Error on forgot password, try again'})
    }
}

async function resetPassword(req, res) {
    const { email, password, token } = req.body

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires')

        if (!user)
            return res.status(400).send({ error: 'User not exists'})

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Error token invalid'})
        
        if (new Date() > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new token'})

        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save()

        res.send()
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Cannot reset password, try again'})
    }
}

module.exports = app => app.use('/auth', router)