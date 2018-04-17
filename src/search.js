var elastic = require('elasticsearch'),
	config  = require('../config/config.js'),
	host	= config.elasticHost,
	client  = new elastic.Client({
		host: host,
		log: 'trace'
	});

/*client.ping({
	requestTimeout: 30000
}, function(err) {
	if(err) {
		console.trace('elasticsearch cluster is down');
	} else {
		console.log('All is well');
	}
});*/

exports.createIndex = (indexName) => {
	client.indices.create({
		index: indexName
	}, (err, status, response) => {
		if(err) {
			return console.log(err);
		} else {
			console.log(response);
		}
	})
}

exports.addDocument = (document, indexName) => {
	client.index({
		index: indexName,
		type: 'document',
		body: {
			title: document.title,
			author: document.author,
			price: document.price
		}
	}, (err, resp) => {
		if(err) {
			console.log(err)
		}

		console.log(resp);
	})
}

exports.queryDocument = (searchTerm) => {
	return new Promise((resolve, reject) => {
		client.search({
			index: 'store',
			type: 'document',
			body: {
				query: {
					multi_match: {
						query: searchTerm,
						fields: ['title', 'author']
					}
				}
			}
		}, (err, resp) => {
			if(err) {
				reject(err);
			} else {
				resolve(resp);
			}
		})
		
	})
}

