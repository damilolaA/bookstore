const express = require('express'),
	  app = require("./src/server/server.js"),
	  config = require("./config/config.js"),
	  port = config.port;

//app.use(express.static(__dirname + '/uploads'));

app.get('/images/:filename', (req, res) => {

  if(req.params.filename) {

  	// collect filename from req.params and define options for sendFile method
  	let filename = req.params.filename,
  		options = {
  			root: __dirname + '/uploads/'
  		};

  	// use express sendFile to send files
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