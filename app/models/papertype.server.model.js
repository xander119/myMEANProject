'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Papertype Schema
 */
var PapertypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Paper type name',
		trim: true
	},
	description: {
        type: String,
        default: '',
        required: 'Please fill Paper type description',
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

mongoose.model('Papertype', PapertypeSchema);
