const User = require('../models/User')

module.exports = {
    async register(req, res) {
        try {
            const { email } = req.body
            if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists'})
            const user = await User.create(req.body)
            user.password = undefined
            return res.send({ user })
        } catch (err) {
            return res.status(400).send({error: 'Registration failed'})
        }
    }
}