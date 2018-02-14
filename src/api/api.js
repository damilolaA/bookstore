let express     = require("express"),
	api		    = express.Router(),
	adminRouter = require("./v1/admin/admin-router.js");

//mount adminRouter on /admin path
api.use("/admin", adminRouter);

module.exports = api;