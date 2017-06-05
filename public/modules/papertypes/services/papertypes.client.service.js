'use strict';

//Papertypes service used to communicate Papertypes REST endpoints
angular.module('papertypes').factory('Papertypes', ['$resource',
	function($resource) {
		return $resource('papertypes/:papertypeId', { papertypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);