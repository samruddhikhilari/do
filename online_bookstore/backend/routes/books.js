const express = require('express');
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/books');

const router = express.Router();

// Routes for /api/books
router
    .route('/')
    .get(getBooks)
    .post(addBook);

// Routes for /api/books/:id
router
    .route('/:id')
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook);

module.exports = router;
