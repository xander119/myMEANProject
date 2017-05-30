'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
    var productsController = require('../../app/controllers/products.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/products')
        .get(productsController.list)
        .post(users.requiresLogin, productsController.create);

    app.route('/products/:productId')
        .get(productsController.read)
        .put(users.requiresLogin, productsController.update)
        .delete(users.requiresLogin, productsController.delete);

    // Finish by binding the article middleware
    // What's this? Where the productId is present in the URL
    // the logic to 'get by id' is handled by this single function
    // and added to the request object i.e. request.product.
    app.param('productId', productsController.productByID);
};
