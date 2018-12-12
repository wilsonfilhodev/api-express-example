const nodemailer = require('nodemailer')
const { configMailer } = require('../../config')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const { host, port, auth } = configMailer

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user: auth.user,
        pass: auth.pass
    }
})

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}))

module.exports = transport  