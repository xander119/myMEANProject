'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

/**
 * Create a Cateogry
 */
exports.create = function(req, res) {
    var category = new Category(req.body);

    category.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(category);
        }
    });
};

/**
 * Show the current Cateogry
 */
exports.read = function(req, res) {
    Category.findById(req.params.categoryId).exec(function (err, category) {
        if(err){
            return res.status(400).send({message:errorHandler.getMessage(err)});
        }else {
            if(!category){
                return res.status(404).send({message:'Category not found.'});
            }else{
                res.json(category);
            }
        }
    });
};

/**
 * Update a Cateogry
 */
exports.update = function(req, res) {
    var category = req.category;

    category = _.extend(category, req.body);

    category.save(function (err) {
        if (err){
            return res.status(400).send({message:errorHanedler.getErrorMessage(err)});
        }else{
            res.json(category);
        }
    });
};

/**
 * Delete an Cateogry
 */
exports.delete = function(req, res) {
    var category = req.category;

    category.remove(function (err) {
        if (err){
            return res.status(400).send({message:errorHandler.getErrorMessage(err)});
        }else{
            res.json(category);
        }
    });
};

/**
 * List of Cateogries
 */
exports.list = function(req, res) {
    Category.find().exec(function(error,categories){
        if(error){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else {
            res.json(categories);
        }
    });
};


/**
 * Category middleware
 */
exports.categoryByID = function (req, res, next, id) {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:'Category is invalid.'});
    }
    Category.findById(id).exec(function (err, category) {
        if(err){return next(err);}
        if(!category){
            return res.status(404).send({message:'Category not found'});
        }
        req.category = category;
        next();
    });

};
