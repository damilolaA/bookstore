let elasticSearch = require('../../../search.js');

exports.search = (req, res, next) => {
  let searchTerm = req.body.searchTerm;

  elasticSearch.queryDocument(searchTerm)
  	.then(data => {
  		console.log(data);
  		res.status(200).json(data);
  	})
  	.catch(err => {
  		console.log(err);
  		return next(new Error('could not fetch matched terms'));
  	})
}