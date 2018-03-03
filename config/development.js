module.exports = {
	port: process.env.PORT || 2000,
	mongodbUrl: 'mongodb://mongo/bookstore',
	secret: 'adminToken',
	redisPort: 6379,
	redisHost: 'redis'
}