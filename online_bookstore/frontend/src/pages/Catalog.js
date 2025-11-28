import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dummyBooks, dummyCategories } from '../data/dummyData';
import '../styles/Catalog.css';

function Catalog() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('title');

    // Load books from dummy data
    useEffect(() => {
        setLoading(true);
        try {
            setBooks(dummyBooks);
            setLoading(false);
        } catch (err) {
            setError('Failed to load books. Please try again later.');
            setLoading(false);
        }
    }, []);

    // Filter and sort books
    const filteredAndSortedBooks = React.useMemo(() => {
        let result = [...books];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.description.toLowerCase().includes(term)
            );
        }

        // Filter by category
        if (category !== 'all') {
            result = result.filter(book => book.category === category);
        }

        // Sort books
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'title':
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        return result;
    }, [books, searchTerm, category, sortBy]);

    // Get unique categories from books
    const categories = ['all', ...new Set(books.map(book => book.category))];

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading books...</p>
            </div>
        );
    }

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h1>Explore Our Collection</h1>
                <p className="catalog-intro">Browse through our wide selection of books. Use the filters to find your next great read!</p>

                <div className="search-sort-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by title, author, or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <i className="search-icon">🔍</i>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="category-filter">Category:</label>
                        <select
                            id="category-filter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-by">Sort by:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="title">Title (A-Z)</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {filteredAndSortedBooks.length > 0 ? (
                <div className="book-grid">
                    {filteredAndSortedBooks.map((book) => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover">
                                <img src={book.image} alt={book.title} className="book-image" />
                                <div className="book-overlay">
                                    <Link to={`/book/${book.id}`} className="view-details-btn">
                                        View Details
                                    </Link>
                                </div>
                                {book.stock < 5 && book.stock > 0 && (
                                    <span className="low-stock-badge">Only {book.stock} left!</span>
                                )}
                                {book.stock === 0 && (
                                    <span className="out-of-stock-badge">Out of Stock</span>
                                )}
                            </div>
                            <div className="book-details">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">by {book.author}</p>
                                <div className="book-meta">
                                    <span className="book-category">{book.category}</span>
                                    <span className="book-rating">★ {book.rating}</span>
                                </div>
                                <p className="book-price">Rs. {book.price.toFixed(2)}</p>
                                <button
                                    className={`add-to-cart-btn ${book.stock === 0 ? 'disabled' : ''}`}
                                    disabled={book.stock === 0}
                                >
                                    {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <img
                        src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
                        alt="No results found"
                        className="no-results-image"
                    />
                    <h3>No books found</h3>
                    <p>We couldn't find any books matching your search. Try adjusting your filters.</p>
                    <button
                        className="reset-filters-btn"
                        onClick={() => {
                            setSearchTerm('');
                            setCategory('all');
                            setSortBy('title');
                        }}
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

            {filteredAndSortedBooks.length > 0 && (
                <div className="results-count">
                    Showing {filteredAndSortedBooks.length} of {books.length} books
                </div>
            )}
        </div>
    );
}

export default Catalog;
