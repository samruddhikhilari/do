import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav style={{
            backgroundColor: '#333',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            marginBottom: '1rem'
        }}>
            <div>
                <Link to="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}>
                    Online Bookstore
                </Link>
            </div>
            <div>
                <Link to="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '0 10px'
                }}>
                    Home
                </Link>
                <Link to="/catalog" style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '0 10px'
                }}>
                    Catalog
                </Link>
                <Link to="/database" style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '0 10px'
                }}>
                    Database
                </Link>
                <Link to="/login" style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '0 10px'
                }}>
                    Login
                </Link>
                <Link to="/register" style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '0 10px'
                }}>
                    Register
                </Link>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        marginLeft: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
