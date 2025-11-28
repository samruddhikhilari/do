const mongoose = require('mongoose');
const Book = require('./models/Book');
const { dummyBooks } = require('../frontend/src/data/dummyData');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/online_bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Function to import data
async function importData() {
    try {
        // Clear existing data
        await Book.deleteMany({});
        console.log('Cleared existing books');

        // Format the data to match the Book model
        const booksToInsert = dummyBooks.map(book => ({
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            image_url: book.image,
            category: book.category,
            rating: book.rating,
            stock: book.stock
        }));

        // Insert the data
        const result = await Book.insertMany(booksToInsert);
        console.log(`Successfully inserted ${result.length} books`);

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
}

// Run the import
importData();
