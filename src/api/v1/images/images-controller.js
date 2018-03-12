const fs = require('fs'),
	  path = require('path'),
	  Root = path.resolve(__dirname);
	//uploads = '../../../../uploads/';

exports.getImages = (req, res, next) => {
  	
  if(req.params.filename) {

  	let filename = req.params.filename;
  	//console.log(uploads);
  	console.log(filename);

  	fs.readdir(Root + 'uploads', (err, images) => {
	    if(err) {
	       console.log(err);
	    }

	    images.forEach(image => {
	    	console.log(image);
	    })
	})

	res.status(200).json("Hello");
  }
}