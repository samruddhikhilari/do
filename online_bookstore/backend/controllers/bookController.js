const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
    try {
        const { category, search, sortBy = 'title', sortOrder = 'asc' } = req.query;

        // Build query
        const query = {};

        // Apply filters
        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Build sort object
        const sort = {};
        const validSortFields = ['title', 'author', 'price', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';
        sort[sortField] = sortOrder.toLowerCase() === 'desc' ? -1 : 1;

        // Execute query
        const books = await Book.find(query).sort(sort);

        res.json(books);
    } catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({ message: 'Server error while fetching books' });
    }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Get book by ID error:', error);
        res.status(500).json({ message: 'Server error while fetching book' });
    }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private/Admin
exports.addBook = async (req, res) => {
    try {
        const { title, author, description, price, category, image_url } = req.body;

        // Create new book
        const book = new Book({
            title,
            author,
            description,
            price,
            category,
            image_url
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        console.error('Add book error:', error);
        res.status(500).json({
            message: 'Server error while adding book',
            error: error.message
        });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res) => {
    try {
        const { title, author, description, price, category, image_url } = req.body;

        // Find book by ID
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update book fields
        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.price = price || book.price;
        book.category = category || book.category;
        book.image_url = image_url || book.image_url;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({
            message: 'Server error while updating book',
            error: error.message
        });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({
            message: 'Server error while deleting book',
            error: error.message
        });
    }
};
