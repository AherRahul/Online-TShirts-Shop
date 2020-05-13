const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getUserById, getUser, getAllBasicUser, updateUser, userPurchaseList } = require('../controllers/user');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');

// PARAM
// Parameter call by UserId
router.param('userId', getUserById);

/**
 * GET REQUEST
 * Author: Rahul Aher
 * Purpose: to fetch the single user from DB based on User Id
 * Params: UserId: String
 * Middlewares: isSignedIn, isAuthenticated
 */
// http://localhost:3030/api/user/5eba967d00c32b52ccf724b8
// Get Single User By UserId
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

/**
 * GET REQUEST
 * Author: Rahul Aher
 * Purpose: to fetch the All user from DB
 * Middlewares: isSignedIn, isAdmin
 */
// http://localhost:3030/api/users
router.get('/users/:userId', isSignedIn, isAuthenticated, isAdmin, getAllBasicUser);

/**
 * PUT REQUEST
 * Author: Rahul Aher
 * Purpose: to modufy user info in DB based on User Id
 * Params: UserId: String
 * Middlewares: isSignedIn, isAuthenticated
 */
// http://localhost:3030/api/user/5eba967d00c32b52ccf724b8
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

router.get('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;