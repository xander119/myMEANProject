'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


function validateLength(value){
	return value.length<=40;
}

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'invalid Category'
	},

	name: {
		type: String,
		default: '',
		required: 'Name cannot be blank',
		trim: true,
		validate: [validateLength, 'name must be 40 chars in length or less']
	},
	quantityByUnit: {
		type: String
	},
	unitPrice: {
		type: Number,
		default: 0
	},
	uniteInStock: {
		type: Number,
		default: 0,
		min: 0
	},
	unitsOnOrder: {
		type: Number,
		default: 0,
		min: 0
	},
    discontinued: {
		type: Boolean,
		default: false
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

mongoose.model('Product', ProductSchema);
