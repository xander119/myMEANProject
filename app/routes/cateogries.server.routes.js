'use strict';

module.exports = function (app) {
    // Routing logic
    // ...
    var categoriesController = require('../../app/controllers/categories.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/categories')
        .get(categoriesController.list)
        .post(users.requiresLogin, categoriesController.create);

    app.route('/categories/:categoryId')
        .get(categoriesController.read)
        .put(users.requiresLogin, categoriesController.update)
        .delete(users.requiresLogin, categoriesController.delete);

    // Finish by binding the article middleware
    // What's this? Where the categoryId is present in the URL
    // the logic to 'get by id' is handled by this single function
    // and added to the request object i.e. request.category.
    app.param('categoryId', categoriesController.categoryByID);
};
