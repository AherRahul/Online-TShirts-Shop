const { Order, ProductInCart } = require('../models/order');

// PARAMS
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: "No order found in DB"
                });
            }

            req.order = order;
            next();
        });
}

// Actual Routes
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
        }

        return res.json(order);
    });
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err || !orders) {
                return res.status(400).json({
                    error: "No orders found in DB"
                });
            }

            return res.json(orders);
        })
}

exports.getStatusOfOrder = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatusOfOrder = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Error occurred while updating order"
            });
        }

        return res.status(200).json(order);
    });
}