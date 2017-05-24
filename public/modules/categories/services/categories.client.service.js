'use strict';

angular.module('categories').factory('Categories', [
	function($resource) {
		// Categories service logic
		// ...

		// Public API
        return $resource('categories/:categoryId', { categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
	}
]);
