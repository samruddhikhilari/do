import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

// Context
import AuthState from './context/auth/AuthState';
import BookState from './context/book/BookState';

theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

function App() {
    return (
        <AuthState>
            <BookState>
                <ThemeProvider theme={theme}>
                    <Router>
                        <CssBaseline />
                        <div className="App">
                            <Navbar />
                            <main style={{ minHeight: '80vh' }}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/catalog" element={<Catalog />} />
                                    <Route path="/book/:id" element={<BookDetails />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <Footer />
                            <ToastContainer position="top-center" autoClose={3000} />
                        </div>
                    </Router>
                </ThemeProvider>
            </BookState>
        </AuthState>
    );
}

export default App;
