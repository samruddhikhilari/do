import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyBooks } from '../data/dummyData';
import '../styles/BookDetails.css';

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchBookDetails = () => {
            setLoading(true);
            try {
                // Find the book by ID
                const foundBook = dummyBooks.find(book => book.id === id);
                if (foundBook) {
                    setBook(foundBook);
                    // Find related books (same category, excluding current book)
                    const related = dummyBooks.filter(
                        b => b.category === foundBook.category && b.id !== foundBook.id
                    ).slice(0, 4);
                    setRelatedBooks(related);
                } else {
                    // If book not found, redirect to 404 or catalog
                    navigate('/catalog');
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, navigate]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= (book?.stock || 1)) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        // Add to cart logic would go here
        alert(`Added ${quantity} ${quantity > 1 ? 'copies' : 'copy'} of "${book?.title}" to cart`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading book details...</p>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="not-found">
                <h2>Book not found</h2>
                <p>The book you're looking for doesn't exist or has been removed.</p>
                <Link to="/catalog" className="back-to-catalog">
                    Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="book-details-page">
            <div className="book-details-container">
                <div className="breadcrumb">
                    <Link to="/">Home</Link> &gt;
                    <Link to="/catalog">Catalog</Link> &gt;
                    <span>{book.title}</span>
                </div>

                <div className="book-details-content">
                    <div className="book-cover-container">
                        <div className="book-cover">
                            <img src={book.image} alt={book.title} />
                            {book.stock < 5 && book.stock > 0 && (
                                <span className="stock-badge low-stock">Only {book.stock} left!</span>
                            )}
                            {book.stock === 0 && (
                                <span className="stock-badge out-of-stock">Out of Stock</span>
                            )}
                        </div>
                    </div>

                    <div className="book-info">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="book-author">by {book.author}</p>

                        <div className="book-meta">
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(book.rating) ? 'filled' : ''}`}>
                                        {i < Math.floor(book.rating) ? '★' : '☆'}
                                    </span>
                                ))}
                                <span className="rating-value">{book.rating.toFixed(1)}</span>
                                <span className="reviews">({book.reviews} reviews)</span>
                            </div>

                            <div className="availability">
                                {book.stock > 0 ? (
                                    <span className="in-stock">In Stock ({book.stock} available)</span>
                                ) : (
                                    <span className="out-of-stock">Out of Stock</span>
                                )}
                            </div>

                            <div className="category">
                                <span>Category: </span>
                                <Link to={`/catalog?category=${encodeURIComponent(book.category)}`}>
                                    {book.category}
                                </Link>
                            </div>
                        </div>

                        <div className="book-price">
                            <span className="current-price">Rs. {book.price.toFixed(2)}</span>
                            {book.originalPrice && (
                                <span className="original-price">Rs. {book.originalPrice.toFixed(2)}</span>
                            )}
                            {book.discount && (
                                <span className="discount">Save {book.discount}%</span>
                            )}
                        </div>

                        <div className="book-actions">
                            {book.stock > 0 && (
                                <div className="quantity-selector">
                                    <label htmlFor="quantity">Qty:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        max={book.stock}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                            )}

                            <button
                                className={`add-to-cart-btn ${book.stock === 0 ? 'disabled' : ''}`}
                                onClick={handleAddToCart}
                                disabled={book.stock === 0}
                            >
                                {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>

                            <button className="wishlist-btn">
                                <span>❤</span> Add to Wishlist
                            </button>
                        </div>

                        <div className="book-description">
                            <h3>Description</h3>
                            <p>{book.description}</p>
                        </div>

                        <div className="book-details-meta">
                            <div className="detail-row">
                                <span className="detail-label">Publisher:</span>
                                <span className="detail-value">{book.publisher || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Published:</span>
                                <span className="detail-value">{book.publishedDate || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Pages:</span>
                                <span className="detail-value">{book.pages || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Language:</span>
                                <span className="detail-value">{book.language || 'English'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">ISBN:</span>
                                <span className="detail-value">{book.isbn || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedBooks.length > 0 && (
                    <div className="related-books">
                        <h2>You May Also Like</h2>
                        <div className="related-books-grid">
                            {relatedBooks.map(relatedBook => (
                                <div key={relatedBook.id} className="related-book-card">
                                    <Link to={`/book/${relatedBook.id}`}>
                                        <div className="related-book-cover">
                                            <img src={relatedBook.image} alt={relatedBook.title} />
                                        </div>
                                        <h3>{relatedBook.title}</h3>
                                        <p className="related-book-author">{relatedBook.author}</p>
                                        <p className="related-book-price">Rs. {relatedBook.price.toFixed(2)}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="back-to-catalog-container">
                    <Link to="/catalog" className="back-to-catalog">
                        ← Back to Catalog
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
