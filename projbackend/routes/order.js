const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById, pushOrderInPurchesList } = require('../controllers/user');
const { updateStock } = require('../controllers/product');
const { getOrderById, createOrder } = require('../controllers/order');
const { create } = require('../models/user');

// PARAMS
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// All Routes
// Create
router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchesList, updateStock, createOrder);


// Exporting the routes
module.exports = router;