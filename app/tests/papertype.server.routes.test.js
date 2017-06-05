'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Papertype = mongoose.model('Papertype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, papertype;

/**
 * Papertype routes tests
 */
describe('Papertype CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Papertype
		user.save(function() {
			papertype = {
				name: 'Papertype Name'
			};

			done();
		});
	});

	it('should be able to save Papertype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papertype
				agent.post('/papertypes')
					.send(papertype)
					.expect(200)
					.end(function(papertypeSaveErr, papertypeSaveRes) {
						// Handle Papertype save error
						if (papertypeSaveErr) done(papertypeSaveErr);

						// Get a list of Papertypes
						agent.get('/papertypes')
							.end(function(papertypesGetErr, papertypesGetRes) {
								// Handle Papertype save error
								if (papertypesGetErr) done(papertypesGetErr);

								// Get Papertypes list
								var papertypes = papertypesGetRes.body;

								// Set assertions
								(papertypes[0].user._id).should.equal(userId);
								(papertypes[0].name).should.match('Papertype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Papertype instance if not logged in', function(done) {
		agent.post('/papertypes')
			.send(papertype)
			.expect(401)
			.end(function(papertypeSaveErr, papertypeSaveRes) {
				// Call the assertion callback
				done(papertypeSaveErr);
			});
	});

	it('should not be able to save Papertype instance if no name is provided', function(done) {
		// Invalidate name field
		papertype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papertype
				agent.post('/papertypes')
					.send(papertype)
					.expect(400)
					.end(function(papertypeSaveErr, papertypeSaveRes) {
						// Set message assertion
						(papertypeSaveRes.body.message).should.match('Please fill Papertype name');
						
						// Handle Papertype save error
						done(papertypeSaveErr);
					});
			});
	});

	it('should be able to update Papertype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papertype
				agent.post('/papertypes')
					.send(papertype)
					.expect(200)
					.end(function(papertypeSaveErr, papertypeSaveRes) {
						// Handle Papertype save error
						if (papertypeSaveErr) done(papertypeSaveErr);

						// Update Papertype name
						papertype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Papertype
						agent.put('/papertypes/' + papertypeSaveRes.body._id)
							.send(papertype)
							.expect(200)
							.end(function(papertypeUpdateErr, papertypeUpdateRes) {
								// Handle Papertype update error
								if (papertypeUpdateErr) done(papertypeUpdateErr);

								// Set assertions
								(papertypeUpdateRes.body._id).should.equal(papertypeSaveRes.body._id);
								(papertypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Papertypes if not signed in', function(done) {
		// Create new Papertype model instance
		var papertypeObj = new Papertype(papertype);

		// Save the Papertype
		papertypeObj.save(function() {
			// Request Papertypes
			request(app).get('/papertypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Papertype if not signed in', function(done) {
		// Create new Papertype model instance
		var papertypeObj = new Papertype(papertype);

		// Save the Papertype
		papertypeObj.save(function() {
			request(app).get('/papertypes/' + papertypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', papertype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Papertype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papertype
				agent.post('/papertypes')
					.send(papertype)
					.expect(200)
					.end(function(papertypeSaveErr, papertypeSaveRes) {
						// Handle Papertype save error
						if (papertypeSaveErr) done(papertypeSaveErr);

						// Delete existing Papertype
						agent.delete('/papertypes/' + papertypeSaveRes.body._id)
							.send(papertype)
							.expect(200)
							.end(function(papertypeDeleteErr, papertypeDeleteRes) {
								// Handle Papertype error error
								if (papertypeDeleteErr) done(papertypeDeleteErr);

								// Set assertions
								(papertypeDeleteRes.body._id).should.equal(papertypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Papertype instance if not signed in', function(done) {
		// Set Papertype user 
		papertype.user = user;

		// Create new Papertype model instance
		var papertypeObj = new Papertype(papertype);

		// Save the Papertype
		papertypeObj.save(function() {
			// Try deleting Papertype
			request(app).delete('/papertypes/' + papertypeObj._id)
			.expect(401)
			.end(function(papertypeDeleteErr, papertypeDeleteRes) {
				// Set message assertion
				(papertypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Papertype error error
				done(papertypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Papertype.remove().exec();
		done();
	});
});