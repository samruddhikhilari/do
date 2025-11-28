const express = require('express');
const router = express.Router();
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

/**
 * @route   GET /api/books
 * @desc    Get all books with optional filtering and sorting
 * @access  Public
 */
router.get('/', getBooks);

/**
 * @route   GET /api/books/:id
 * @desc    Get a single book by ID
 * @access  Public
 */
router.get('/:id', getBookById);

// Protect all routes after this middleware
router.use(requireAuth);

/**
 * @route   POST /api/books
 * @desc    Create a new book
 * @access  Private/Admin
 */
router.post('/', requireAdmin, addBook);

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book
 * @access  Private/Admin
 */
router.put('/:id', requireAdmin, updateBook);

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book
 * @access  Private/Admin
 */
router.delete('/:id', requireAdmin, deleteBook);

module.exports = router;
