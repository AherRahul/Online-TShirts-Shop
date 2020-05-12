const User = require("../models/user");
const { check, validationResult } = require('express-validator');

exports.SignUp = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }

    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                message: "NOT able to save user in DB"
            });
        }

        return res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        });
    });
}

exports.Signout = (req, res) => {
    res.json({
        message: "User Signout"
    });
};