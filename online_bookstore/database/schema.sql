-- Create database
CREATE DATABASE IF NOT EXISTS online_bookstore;
USE online_bookstore;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data for books
INSERT INTO books (title, author, description, price, category) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of decadence and excess in the Jazz Age', 12.99, 'Classic'),
('To Kill a Mockingbird', 'Harper Lee', 'A powerful story of racial injustice and moral growth', 10.99, 'Fiction'),
('1984', 'George Orwell', 'A dystopian novel about totalitarianism', 9.99, 'Science Fiction'),
('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel about Bilbo Baggins''s adventures', 14.99, 'Fantasy');

-- Create a user for the application
-- Replace 'your_password' with a secure password
-- GRANT ALL PRIVILEGES ON online_bookstore.* TO 'bookstore_user'@'localhost' IDENTIFIED BY 'your_password';
-- FLUSH PRIVILEGES;
