import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/DatabaseView.css';

function DatabaseView() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books from the database');
                setLoading(false);
                console.error('Error fetching books:', err);
            }
        };

        fetchBooks();
    }, []);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedBooks = React.useMemo(() => {
        let sortableItems = [...books];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [books, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    if (loading) return <div className="loading">Loading books from database...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="database-container">
            <h1>Book Database</h1>
            <div className="table-responsive">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('title')}>
                                Title {getSortIcon('title')}
                            </th>
                            <th onClick={() => requestSort('author')}>
                                Author {getSortIcon('author')}
                            </th>
                            <th onClick={() => requestSort('category')}>
                                Category {getSortIcon('category')}
                            </th>
                            <th className="text-right" onClick={() => requestSort('price')}>
                                Price {getSortIcon('price')}
                            </th>
                            <th className="text-center" onClick={() => requestSort('stock')}>
                                Stock {getSortIcon('stock')}
                            </th>
                            <th className="text-center" onClick={() => requestSort('rating')}>
                                Rating {getSortIcon('rating')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.map((book) => (
                            <tr key={book._id}>
                                <td className="book-title">
                                    <div className="book-info">
                                        <img
                                            src={book.image_url}
                                            alt={book.title}
                                            className="book-thumbnail"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/40x60?text=No+Image';
                                            }}
                                        />
                                        <span>{book.title}</span>
                                    </div>
                                </td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td className="text-right">Rs. {book.price?.toFixed(2) || 'N/A'}</td>
                                <td className={`text-center ${book.stock < 5 ? 'low-stock' : ''}`}>
                                    {book.stock}
                                </td>
                                <td className="text-center">
                                    <span className="rating">
                                        {book.rating} <span className="star">★</span>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-footer">
                <span className="total-books">Total: {books.length} books</span>
                <Link to="/" className="back-link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default DatabaseView;
