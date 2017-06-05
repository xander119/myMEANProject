'use strict';

// Papertypes controller
angular.module('papertypes').controller('PapertypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Papertypes',
	function($scope, $stateParams, $location, Authentication, Papertypes) {
		$scope.authentication = Authentication;

		// Create new Papertype
		$scope.create = function() {
			// Create new Papertype object
			var papertype = new Papertypes ({
				name: this.name
			});

			// Redirect after save
			papertype.$save(function(response) {
				$location.path('papertypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Papertype
		$scope.remove = function(papertype) {
			if ( papertype ) { 
				papertype.$remove();

				for (var i in $scope.papertypes) {
					if ($scope.papertypes [i] === papertype) {
						$scope.papertypes.splice(i, 1);
					}
				}
			} else {
				$scope.papertype.$remove(function() {
					$location.path('papertypes');
				});
			}
		};

		// Update existing Papertype
		$scope.update = function() {
			var papertype = $scope.papertype;

			papertype.$update(function() {
				$location.path('papertypes/' + papertype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Papertypes
		$scope.find = function() {
			$scope.papertypes = Papertypes.query();
		};

		// Find existing Papertype
		$scope.findOne = function() {
			$scope.papertype = Papertypes.get({ 
				papertypeId: $stateParams.papertypeId
			});
		};
	}
]);