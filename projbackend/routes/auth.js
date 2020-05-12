const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Signout, SignUp } = require("../controllers/auth");

router.post('/signup', [
    check('firstname').isLength({ max: 32, min: 3 }).withMessage('Firstname must be at least 3 chars long'),
    check('lastname').isLength({ max: 32, min: 3 }).withMessage('Lastname must be at least 3 chars long'),
    check('email', 'E-mail is incorrect').isEmail(),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number character')
], SignUp);

router.get('/signout', Signout);

module.exports = router;