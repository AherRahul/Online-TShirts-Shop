require('dotenv').config();
const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Signup Route Controller
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
};

// Signin Route Controller
exports.SignIn = (req, res) => {
    //Destructuring of req body
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }

    User.findOne({ email }, (error, user) => {
        if (error) {
            return res.status(400).json({
                error: "Unable to find user in DB"
            });
        }

        if (!user) {
            return res.status(400).json({
                error: "User does not exist in DB"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "E-mail and password do not match"
            });
        }

        // Creating a TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        // Put TOKEN in Cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        // Send response to Front-End
        const { _id, firstname, email, role } = user;

        return res.json({ token, user: { _id, firstname, email, role } });

    });
};

// Signout Route Controller
exports.Signout = (req, res) => {

    res.clearCookie("token");

    res.json({
        message: "User Signout successfully..!!"
    });
};

// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// Custom Middleware
// Authentication Middleware
exports.isAuthenticated = (req, res, next) => {
    var checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }

    next();
};

// Admin Middleware
exports.isAdmin = (req, res, next) => {
    if (req.auth.role === 0) {
        res.status(403).json({
            error: "User not have Admin privileges. ACCESS DENIED"
        });
    }

    next();
}