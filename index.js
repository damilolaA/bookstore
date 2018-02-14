let app = require("./src/server/server.js")

app.listen(2000, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("server started!!!...")
})