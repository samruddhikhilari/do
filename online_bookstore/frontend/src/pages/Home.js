import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dummyBooks } from '../data/dummyData';
import '../styles/Home.css';

const Home = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {
        // Get first 4 books as featured
        setFeaturedBooks(dummyBooks.slice(0, 4));
    }, []);

    return (
        <div className="home-container">
            <div className="hero">
                <h1>Welcome to Our Online Bookstore</h1>
                <p>Discover a wide range of books from various genres. Start exploring our collection today!</p>
                <div className="cta-buttons">
                    <Link to="/catalog" className="btn btn-primary">Browse Books</Link>
                    <Link to="/register" className="btn btn-outline">Sign Up</Link>
                </div>
            </div>

            <section className="featured-books">
                <h2>Featured Books</h2>
                <div className="book-grid">
                    {featuredBooks.map(book => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover">
                                <img src={book.image} alt={book.title} />
                                <div className="book-overlay">
                                    <Link to={`/book/${book.id}`} className="btn btn-small">View Details</Link>
                                </div>
                            </div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author}</p>
                                <div className="book-meta">
                                    <span className="price">Rs. {book.price.toFixed(2)}</span>
                                    <span className="rating">★ {book.rating}</span>
                                </div>
                                <button className="btn btn-small btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: '2rem' }}>
                    <Link to="/catalog" className="btn">View All Books</Link>
                </div>
            </section>

            <div className="features">
                <div className="feature">
                    <div className="feature-icon">📚</div>
                    <h3>Wide Selection</h3>
                    <p>Choose from thousands of books across all genres, from bestsellers to hidden gems.</p>
                </div>
                <div className="feature">
                    <div className="feature-icon">🛒</div>
                    <h3>Easy Ordering</h3>
                    <p>Simple and secure checkout process with multiple payment options available.</p>
                </div>
                <div className="feature">
                    <div className="feature-icon">🚚</div>
                    <h3>Fast Delivery</h3>
                    <p>Get your books delivered to your doorstep within 2-3 business days.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
