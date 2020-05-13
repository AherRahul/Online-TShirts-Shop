const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getUserById, getUser } = require('../controllers/user');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');

// Parameter call by UserId
router.param('userId', getUserById);

// Get Single User By UserId
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);


module.exports = router;