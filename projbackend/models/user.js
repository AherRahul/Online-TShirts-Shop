var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

/**
 * Author: Rahul Aher
 * Purpose: Use to hold data of user to push into DB
 * Password is stored in the encrypted format using pasword hashing and salting
 */
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    // Hold the encrypted password
    encry_password: {
        type: String,
        required: true
    },
    // Hold the salt value
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    },

}, { timestamps: true });

/**
 * Author: Rahul Aher
 * Params: String => Plain password entered by user
 * Created a virtual field for password, take plain passswod by user and hashed it by using securedPassword function
 * Salt value is initialize in the function using UUID. 
 * UUID generate random and unique string which get appended to password password hashed value
 * 
 **/
userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

userSchema.methods = {
    // TODO: Come here
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },

    securePassword: function(plainPassword) {
        // If password is null entered by user the mongo DB thorw and error as password field is required
        if (!plainPassword) return "";

        // Hashing of password done here using CRYPTO
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);