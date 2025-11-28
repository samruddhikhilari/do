const User = require('../models/User');

// Simple session-based authentication middleware
exports.requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// Middleware to check if user is admin
exports.requireAdmin = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    User.findById(req.session.userId)
        .then(user => {
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized as an admin' });
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.error('Admin check error:', err);
            res.status(500).json({ message: 'Server error during admin check' });
        });
};

// Middleware to check if user is logged in (optional)
exports.optionalAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId)
            .then(user => {
                if (user) {
                    req.user = user;
                }
                next();
            })
            .catch(() => next());
    } else {
        next();
    }
};

// The middleware functions are already exported individually at the top
// using exports.functionName
