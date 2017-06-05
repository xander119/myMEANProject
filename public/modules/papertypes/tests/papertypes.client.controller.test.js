'use strict';

(function() {
	// Papertypes Controller Spec
	describe('Papertypes Controller Tests', function() {
		// Initialize global variables
		var PapertypesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Papertypes controller.
			PapertypesController = $controller('PapertypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Papertype object fetched from XHR', inject(function(Papertypes) {
			// Create sample Papertype using the Papertypes service
			var samplePapertype = new Papertypes({
				name: 'New Papertype'
			});

			// Create a sample Papertypes array that includes the new Papertype
			var samplePapertypes = [samplePapertype];

			// Set GET response
			$httpBackend.expectGET('papertypes').respond(samplePapertypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.papertypes).toEqualData(samplePapertypes);
		}));

		it('$scope.findOne() should create an array with one Papertype object fetched from XHR using a papertypeId URL parameter', inject(function(Papertypes) {
			// Define a sample Papertype object
			var samplePapertype = new Papertypes({
				name: 'New Papertype'
			});

			// Set the URL parameter
			$stateParams.papertypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/papertypes\/([0-9a-fA-F]{24})$/).respond(samplePapertype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.papertype).toEqualData(samplePapertype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Papertypes) {
			// Create a sample Papertype object
			var samplePapertypePostData = new Papertypes({
				name: 'New Papertype'
			});

			// Create a sample Papertype response
			var samplePapertypeResponse = new Papertypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Papertype'
			});

			// Fixture mock form input values
			scope.name = 'New Papertype';

			// Set POST response
			$httpBackend.expectPOST('papertypes', samplePapertypePostData).respond(samplePapertypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Papertype was created
			expect($location.path()).toBe('/papertypes/' + samplePapertypeResponse._id);
		}));

		it('$scope.update() should update a valid Papertype', inject(function(Papertypes) {
			// Define a sample Papertype put data
			var samplePapertypePutData = new Papertypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Papertype'
			});

			// Mock Papertype in scope
			scope.papertype = samplePapertypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/papertypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/papertypes/' + samplePapertypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid papertypeId and remove the Papertype from the scope', inject(function(Papertypes) {
			// Create new Papertype object
			var samplePapertype = new Papertypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Papertypes array and include the Papertype
			scope.papertypes = [samplePapertype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/papertypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePapertype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.papertypes.length).toBe(0);
		}));
	});
}());