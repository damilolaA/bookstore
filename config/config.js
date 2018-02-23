const _ = require("lodash");

let config = {

	dev: 'development',
	test: 'test',
	prod: 'production'
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV

console.log(config.env);

const envconfig = require('./' + config.env);

const data = _.merge(config, envconfig);

console.log(data.mongodbUrl);

module.exports = data;