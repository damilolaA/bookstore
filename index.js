const app = require("./src/server/server.js"),
	  config = require("./config/config.js"),
	  port = config.port;

app.listen(port, function(err) {
	
	if(err) {
		return console.log(err);
	}

	console.log("server started at port " + port);
})