const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    // DB Call to fecth user by id
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "No User found in DB"
            });
        }

        // Mapping the user to request profile
        var { _id, firstname, lastname, email, role, purchases, userinfo } = user;
        req.profile = { _id, firstname, lastname, email, role, purchases, userinfo };
        next();
    });
};

exports.getUser = (req, res) => {
    // TODO: get here for password

    return res.json(req.profile);
}