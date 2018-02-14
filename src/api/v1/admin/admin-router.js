let express    = require("express"),
	router     = express.Router(),
	controller = require("./admin-controller.js");

router.param("id", controller.interceptIds)

router.route("/:id")
	.get(controller.getAdminById)

router.route("/")
	.post(controller.addAdmin)
	.get(controller.getAdmins)


module.exports = router;