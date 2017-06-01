'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('view-product', {
			url: '/productview',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('list-product', {
			url: '/productlist',
			templateUrl: 'modules/products/views/list-product.client.view.html'
		}).
		state('edit-product', {
			url: '/productedit',
			templateUrl: 'modules/products/views/edit-product.client.view.html'
		}).
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
