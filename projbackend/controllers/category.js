const Category = require('../models/category');
const { check, validationResult } = require('express-validator');

exports.createCategory = (req, res) => {
    var category = new Category(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }

    category.save((error, category) => {
        if (error || !category) {
            return res.status(400).json({
                error: "Unable to create category"
            });
        }

        return res.json({
            id: category._id,
            name: category.name
        });
    });
};

exports.getAllCategories = (req, res) => {
    Category.find().exec((error, categories) => {
        if (error || !categories) {
            return res.status(400).json({
                error: "Categories NOT FOUND"
            });
        }

        var categoryArray = [];
        for (var i = 0; i < categories.length; i++) {
            var { _id, name } = categories[i];
            categoryArray.push({ _id, name });
        }

        return res.json(categoryArray);
    });
};

exports.getCategoryById = (req, res, next, catId) => {
    Category.findById(catId).exec((error, category) => {
        if (error || !category) {
            return res.status(400).json({
                error: "Category NOT FOUND In DB"
            });
        }

        var { _id, name } = category;
        req.profile = { _id, name };

        next();
    });
};

exports.updateCategory = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }

    Category.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (error, category) => {
        if (error || !category) {
            return res.status(400).json({
                error: "Category Updation FAILED"
            });
        }

        var { _id, name } = category;
        return res.json({ _id, name });
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.profile);
};

exports.deleteCategory = (req, res) => {
    Category.deleteOne({ "_id": req.profile._id }).exec((error, output) => {
        if (error || output.deletedCount != 1) {
            return res.status(400).json({
                error: "Unable to DELETE Category"
            });
        }

        return res.json({
            message: "Category Deleted"
        });
    });
};