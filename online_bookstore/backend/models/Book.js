const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be a positive number']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'Fiction',
            'Non-Fiction',
            'Science',
            'Technology',
            'Biography',
            'History',
            'Fantasy',
            'Romance',
            'Mystery',
            'Self-Help'
        ]
    },
    coverImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create book slug from the title
bookSchema.pre('save', function (next) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
    next();
});

module.exports = mongoose.model('Book', bookSchema);
