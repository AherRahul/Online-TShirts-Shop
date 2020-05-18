require('dotenv').config();
const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({
                error: "No Product Found"
            });
        }

        var { _id, name, description, price, category, stock, sold, photo } = product;
        req.product = { _id, name, description, price, category, stock, sold, photo };
        next();
    });
};

exports.getProduct = (req, res) => {
    return res.json(req.product);
};

exports.getAllProducts = (req, res) => {
    Product.find().exec((error, products) => {
        if (error || !products) {
            return res.status(400).json({
                error: "No Product Found in DB"
            });
        }

        var productsToReturn = [];
        for (var i = 0; i < products.length; i++) {
            var { name, description, price, category, stock, sold, photo } = products[i];
            productsToReturn.push({ name, description, price, category, stock, sold, photo });
        }

        return res.json(productsToReturn);
    });
};

exports.getProductsByCategory = (req, res) => {
    var allProducts = [];

    // One way to fetch products by category
    Product.find({ category: req.category._id }).exec((error, categoryProducts) => {
        if (error || !categoryProducts) {
            return res.status(400).json({
                error: "Unable to fetch Products from DB"
            });
        }

        return res.send(categoryProducts);
    });

};

exports.createProduct = (req, res) => {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;

    var product;

    form.parse(req, (error, fields, file) => {

        if (error) {
            return res.status(400).json({
                error: "Problem With Image"
            });
        }

        // Destructure the fields
        var { name, description, price, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please Include required fields"
            });
        }

        product = new Product(fields);

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size greater than 3Mb..!"
                });
            }
        }
    });


    form.on('fileBegin', function(name, file) {
        file.path = __dirname + '\\uploads\\' + file.name;
    });

    form.on('file', function(name, file) {
        // SEND FILE TO CLOUDINARY
        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        const path = file.path;
        const uniqueFilename = new Date().toISOString()

        cloudinary.uploader.upload(path, { public_id: `T-shirts/Products/${uniqueFilename}`, tags: `T-shirts/Products` },
            // directory and tags are optional
            function(err, image) {
                if (err) {
                    return res.send(err)
                }

                // remove file from server
                fs.unlinkSync(path)

                // Mapping the Cloudinary response to product photo field
                var { asset_id, public_id, signature, format, url, original_filename } = image;
                product.photo = { asset_id, public_id, signature, format, url, original_filename };

                // Saving product into DB
                product.save((error, product) => {
                    if (error) {
                        return res.status(400).json({
                            error: "Unable to save product"
                        });
                    }

                    return res.json(product);
                });
            }
        )
    });
};

exports.updateProduct = (req, res) => {
    if (req.product) {
        Product.findByIdAndUpdate({ _id: req.product._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (error, product) => {
            if (error || !product) {
                return res.status(400).json({
                    error: "Error while updating product"
                });
            }

            var { _id, name, description, price, category, stock, sold, photo } = product;
            return res.json({ _id, name, description, price, category, stock, sold, photo });
        })
    }
}

exports.deleteProduct = (req, res) => {
    if (req.product) {
        Product.deleteOne({ "_id": req.product._id }).exec((error, output) => {
            if (error || output.deletedCount != 1) {
                return res.status(400).json({
                    error: "Error while deleting product"
                });
            }

            return res.json({
                message: "Product Deleted..!"
            })
        })
    }
}