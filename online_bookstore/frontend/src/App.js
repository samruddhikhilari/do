import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import BookDetails from './pages/BookDetails';
import './App.css';

// Set withCredentials to true for all axios requests
axios.defaults.withCredentials = true;

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/catalog"
                            element={
                                <PrivateRoute>
                                    <Catalog />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/book/:id" element={<BookDetails />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;