const User = require("../models/user");

exports.SignUp = (req, res) => {
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