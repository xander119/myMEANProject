'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Papertype = mongoose.model('Papertype'),
	_ = require('lodash');

/**
 * Create a Papertype
 */
exports.create = function(req, res) {
	var papertype = new Papertype(req.body);
	papertype.user = req.user;

	papertype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papertype);
		}
	});
};

/**
 * Show the current Papertype
 */
exports.read = function(req, res) {
	res.jsonp(req.papertype);
};

/**
 * Update a Papertype
 */
exports.update = function(req, res) {
	var papertype = req.papertype ;

	papertype = _.extend(papertype , req.body);

	papertype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papertype);
		}
	});
};

/**
 * Delete an Papertype
 */
exports.delete = function(req, res) {
	var papertype = req.papertype ;

	papertype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papertype);
		}
	});
};

/**
 * List of Papertypes
 */
exports.list = function(req, res) { 
	Papertype.find().sort('-created').populate('user', 'displayName').exec(function(err, papertypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papertypes);
		}
	});
};

/**
 * Papertype middleware
 */
exports.papertypeByID = function(req, res, next, id) { 
	Papertype.findById(id).populate('user', 'displayName').exec(function(err, papertype) {
		if (err) return next(err);
		if (! papertype) return next(new Error('Failed to load Papertype ' + id));
		req.papertype = papertype ;
		next();
	});
};

/**
 * Papertype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.papertype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
