let express     = require("express"),
	api		    = express.Router(),
	adminRouter = require("./v1/admin/admin-router.js");

api.use("/admin", adminRouter);

module.exports = api;