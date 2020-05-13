const User = require('../models/user');
const Order = require('../models/order');

// Fetch User fom DB based on UserID ==> Params
exports.getUserById = (req, res, next, id) => {
    // DB Call to fecth user by id
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "No User found in DB"
            });
        }

        // If Mapping of user not Done then
        // req.profile = user;

        // Mapping the user to request profile
        var { _id, firstname, lastname, email, role, purchases, userinfo } = user;
        req.profile = { _id, firstname, lastname, email, role, purchases, userinfo };

        next();
    });
};

// Fetch single user and map user in the proper form
exports.getUser = (req, res) => {

    // If Mapping of user not Done then
    // req.profile.salt = undefined;
    // req.profile.encry_password = undefined;

    return res.json(req.profile);
}

// Fetching all basic users from DB if user role is admin
exports.getAllBasicUser = (req, res) => {
    User.find().exec((error, users) => {
        if (error || !users) {
            return res.status(400).json({
                error: "No Users Found"
            });
        }

        var BasicUsersArray = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i].role == "0") {
                var { _id, firstname, lastname, email, role, purchases, userinfo } = users[i];
                BasicUsersArray.push({ _id, firstname, lastname, email, role, purchases, userinfo });
            }
        }

        return res.json({
            users: BasicUsersArray
        });
    });
};

// Modifying tthe user info
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "User updatation in Db Failed"
            });
        }
        var { _id, firstname, lastname, email, role, purchases, userinfo } = user;
        return res.json({
            user: { _id, firstname, lastname, email, role, purchases, userinfo }
        });
    });
};

// User Purchase list 
exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((error, order) => {
            if (error || !order) {
                return res.status(400).json({
                    error: "unable to fetch orders"
                });
            }

            return res.json(order);
        });
};

exports.pushOrderInPurchesList = (req, res, next) => {
    let purchases = [];

    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactionId: req.body.order.transactionId
        });
    });

    // store in DB
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { purchases: purchases } }, { new: true }, (error, purchases) => {
        if (error || !purchases) {
            return res.status(400).json({
                error: "unable to save purchases List"
            });
        }

        next();
    });
};