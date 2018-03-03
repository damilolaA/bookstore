module.exports = {
	port: process.env.PORT || 2000,
	mongodbUrl: "mongodb://localhost/bookstore",
	secret: 'adminToken',
	redisPort: 6379,
	redisHost: 'localhost'
}