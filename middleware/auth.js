const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual JWT secret
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
