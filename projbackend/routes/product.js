const express = require('express');
const router = express.Router();
const { getProductById, getProduct, getAllProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct, getAllProductsForList } = require('../controllers/product');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getCategoryById } = require('../controllers/category');

// PARAM
// product by Id
router.param('productId', getProductById);
// category by id
router.param('categoryId', getCategoryById);
// user by Id
router.param('userId', getUserById);


// Products Rotes
// Create
router.post('/product/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

// READ
// Single product by ID
router.get('/product/:productId', getProduct);
// Get All Products
router.get('/products', isSignedIn, isAuthenticated, isAdmin, getAllProducts);
// Get products by category
router.get('/products/:categoryId', getProductsByCategory);
// Listing Route
router.get('/products-for-list', getAllProductsForList);

// Update
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);

// Delete
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);


module.exports = router;