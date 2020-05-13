const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, getCategoryById, getCategory, deleteCategory } = require('../controllers/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');
const { getUserById } = require('../controllers/user');


// PARAM
// All Access
// Find the category by category id
router.param('catId', getCategoryById);
// Find the category by category id
router.param('userId', getUserById);


// CREATE category
// Only ADMIN
router.post('/category/:userId', [
    check('name', 'Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name must be at least 3 chars long')
], isSignedIn, isAuthenticated, isAdmin, createCategory);


// READ Category
// All Access
// Find one category by category Id
router.get('/category/:catId', getCategory);
router.get('/categories', getAllCategories);


// UPDATE Category
// Only ADMIN
router.put('/category/:userId/:catId', [
    check('name', 'Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name must be at least 3 chars long')
], isSignedIn, isAuthenticated, isAdmin, updateCategory);


// DELETE Category
// Only ADMIN
router.delete('/category/:userId/:catId', isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;