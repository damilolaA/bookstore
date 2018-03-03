module.exports = {
	port: process.env.PORT,
	mongodbUrl: process.env.MONGOLAB_URI,
	secret: 'adminToken',
	redisPort: 6379,
	redisHost: process.env.REDIS_URL
}