const User = require('../models/User')

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            return res.send({ user })
        } catch (err) {
            return res.send(400, {error: 'Registration failed'})
        }
    }
}