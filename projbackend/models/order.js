const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
}, { timestamps: true });

const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);


const orderSchema = new mongoose.Schema({
    products: [productInCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: String,
    status: {
        type: String,
        default: "Received",
        enum: [
            "Cancelled",
            "Delivered",
            "Shipped",
            "Processing",
            "Received"
        ]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductInCart };