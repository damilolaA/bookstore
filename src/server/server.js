let express = require("express"),
	app		= express(),
	api		= require("../api/api.js");

app.use("/api/v1", api);

app.use((err, req, res, next) => {
	
	res.status(500).json(err.message);
	next();
})

module.exports = app;