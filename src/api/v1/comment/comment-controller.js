const CommentModel = require('./comment-model'),
	  BookModel = require('../books/books-model'),
	  userModel = require('../user/user-model');

exports.addComment = (req, res, next) => {

	let data = req.body,
	comment = new CommentModel(data);

	comment.save((err, response) => {
		if(err) {
			return next(new Error('could not save comments'))
		}

		let id = response.bookId,
			userId = response.userId;

		userModel.findById({_id: userId}, (err, userData) => {
			if(err) {
				return next(new Error('could not get user details'))
			}

			if(userData) {
				let firstName = userData.firstName,
					lastName = userData.lastName,
					fullName = firstName + " " + lastName;

				response = response.toObject();
				response.fullName = fullName;
				console.log(response);

				BookModel.findByIdAndUpdate(id, 
					{ $push: {"comments": response} },
					{safe: true, upsert: true, new : true},
					(err, result) => {
						if(err) {
							return next(new Error('could not populate comments array'))
						}
						//console.log(result);
					}
				)
			}
			res.status(200).json(response);
		})
	});
	
}

exports.getComments = (req, res, next) => {
	CommentModel.find((err, comments) => {
		if(err) {
			return next(new Error('could not fetch comments'));
		}

		res.status(200).json(comments);
	});
}