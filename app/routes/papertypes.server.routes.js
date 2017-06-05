'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var papertypes = require('../../app/controllers/papertypes.server.controller');

	// Papertypes Routes
	app.route('/papertypes')
		.get(papertypes.list)
		.post(users.requiresLogin, papertypes.create);

	app.route('/papertypes/:papertypeId')
		.get(papertypes.read)
		.put(users.requiresLogin, papertypes.hasAuthorization, papertypes.update)
		.delete(users.requiresLogin, papertypes.hasAuthorization, papertypes.delete);

	// Finish by binding the Papertype middleware
	app.param('papertypeId', papertypes.papertypeByID);
};
