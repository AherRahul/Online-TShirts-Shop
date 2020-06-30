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