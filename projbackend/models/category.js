const mongoose = require("mongoose");

/**
 * Author: Rahul Aher
 * Purpose: Use to hold the data for categories to push in DB
 */

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Category', categorySchema);