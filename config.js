module.exports = {
	name: 'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',

	/**
	 * URL conection database
	 */
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://root:root1234@ds131814.mlab.com:31814/api-express',
	},

	/**
	 * Secret JWT
	 */
	secret: '6edf2bf3ea8ea58db62a685aa8830889',


	/**
	 * Config mailer
	 */
	configMailer: {
		host: "smtp.mailtrap.io",
    	port: 2525,
    	auth: {
			user: "b4b59586ec8ac3",
			pass: "6773427773e110"
		}
	}
};