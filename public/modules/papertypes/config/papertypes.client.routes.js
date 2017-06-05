'use strict';

//Setting up route
angular.module('papertypes').config(['$stateProvider',
	function($stateProvider) {
		// Papertypes state routing
		$stateProvider.
		state('listPapertypes', {
			url: '/papertypes',
			templateUrl: 'modules/papertypes/views/list-papertypes.client.view.html'
		}).
		state('createPapertype', {
			url: '/papertypes/create',
			templateUrl: 'modules/papertypes/views/create-papertype.client.view.html'
		}).
		state('viewPapertype', {
			url: '/papertypes/:papertypeId',
			templateUrl: 'modules/papertypes/views/view-papertype.client.view.html'
		}).
		state('editPapertype', {
			url: '/papertypes/:papertypeId/edit',
			templateUrl: 'modules/papertypes/views/edit-papertype.client.view.html'
		});
	}
]);