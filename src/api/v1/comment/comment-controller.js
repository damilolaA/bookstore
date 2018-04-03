const CommentModel = require('./comment-model');

exports.addComment = (req, res, next) => {

	let data = req.body;

	let comment = new CommentModel(data);

	comment.save((err, response) => {
		if(err) {
			return next(new Error('could not save comments'))
		}

		res.status(200).json(response);
	});
}