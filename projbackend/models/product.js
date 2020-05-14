const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

/**
 * Author: Rahul Aher
 * 
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: Map
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);