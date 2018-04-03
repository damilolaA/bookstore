const Express = require('express'),
	  Router  = Express.Router(),
	  controller = require('./user-controller');

Router.param("id", controller.interceptId);

Router.route('/:id')
	.get(controller.getUserById)
	.delete(controller.deleteUser)
	.put(controller.updateUser)

Router.route('/')
	.post(controller.addUser)
	.get(controller.getUsers)

module.exports = Router;