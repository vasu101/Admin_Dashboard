const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to request object
        next(); // Call next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
