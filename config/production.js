module.exports = {
	port: process.env.PORT,
	mongodbUrl: process.env.MONGOLAB_URI,
	secret: 'adminToken',
	redisURL: process.env.REDIS_URL
}