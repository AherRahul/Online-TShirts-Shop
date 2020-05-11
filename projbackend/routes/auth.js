const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { Signout, SignUp } = require("../controllers/auth");

router.post('/signup', [
    check('firstname').isLength({ max: 32, min: 3 }).withMessage('Firstname must be at least 3 chars long'),
    check('lastname').isLength({ max: 32, min: 3 }).withMessage('Lastname must be at least 3 chars long'),
    check('password').isLength({ min: 5, max: 8 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number'),
    check('email', 'E-mail is required').isEmail()
], SignUp);

router.get('/signout', Signout);

module.exports = router;