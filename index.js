let http = require("http");

let app = http.createServer(function(req, res) {

	console.log("Starting app...")
})	

app.listen(2000, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("server started!!!...")
})