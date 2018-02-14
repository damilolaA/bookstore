let express    = require("express"),
	router     = express.Router(),
	controller = require("./admin-controller.js");

router.param("id", controller.interceptIds)

router.route("/")
	.post(controller.addAdmin)


module.exports = router;