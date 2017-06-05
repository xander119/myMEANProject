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
    description: {
        type: String,
        default: '',
        required: 'Please fill Paper description',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	paper_type: {
		type: Schema.ObjectId,
		ref: 'papertype'
	}
});

mongoose.model('Paper', PaperSchema);
