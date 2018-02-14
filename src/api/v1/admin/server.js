let express = require("express"),
	app		= express();



app.get("/", (req, res) => {
	console.log("Hello world");
})


app.listen(3000, (err) => {
	if(err) {
		return console.log(err)
	}

	console.log("hey there")
})