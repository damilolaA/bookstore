const express = require('express'),
	  fs = require('fs'),
	  app = require("./src/server/server.js"),
	  config = require("./config/config.js"),
	  port = config.port;

app.use(express.static(__dirname + '/uploads'));

app.get('/images/:filename', (req, res) => {
  	
  console.log(req.params.filename);

  if(req.params.filename) {

  	let filename = req.params.filename,
  		options = {
  			root: __dirname + '/uploads/'
  		};

  	let bookImage;

  	fs.readdir("./uploads/", (err, images) => {
	    if(err) {
	       console.log(err);
	    }

	    images.forEach(image => {
	       bookImage = image;
	    })
	})

  	res.sendFile(filename, options, function(err) {
  		if(err) {
  			console.log(err);
  		} else{
  			console.log('Sent:', filename);
  		}
  	});
  }
});

app.listen(port, function(err) {
	
	if(err) {
		return console.log(err);
	}

	console.log("server started at port " + port);
})