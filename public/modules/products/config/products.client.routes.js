'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('create-product', {
			url: '/product/create',
			templateUrl: 'modules/products/views/create-product.client.view.html'
		}).
		state('products', {
			url: '/products',
			templateUrl: 'modules/products/views/products.client.view.html'
		});
	}
]);
