'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Paper Schema
 */
var PaperSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Paper name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Paper', PaperSchema);