const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, getCategoryById, getCategory, deleteCategory } = require('../controllers/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

// Only ADMIN
// Create category
router.post('/category', [
    check('name', 'Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name must be at least 3 chars long')
], isSignedIn, isAdmin, createCategory);

// Only ADMIN
// Update Category
router.put('/category/:catId', [
    check('name', 'Category name is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Category name must be at least 3 chars long')
], isSignedIn, isAdmin, updateCategory);

// PARAM
// All Access
// Find the category by category id
router.param('catId', getCategoryById);

// All Access
// Find one category by category Id
router.get('/category/:catId', getCategory);

// All Access
// Find out All category
router.get('/categories', getAllCategories);

router.delete('/category/:catId', isSignedIn, isAdmin, deleteCategory);

module.exports = router;