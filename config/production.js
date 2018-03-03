module.exports = {
	port: process.env.PORT,
	mongodbUrl: process.env.MONGOLAB_URI,
	secret: 'adminToken',
	redisPort: "",
	redisHost: process.env.REDIS_URL
}