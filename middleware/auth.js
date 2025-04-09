const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware cek token
const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  const token = bearer && bearer.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
    req.user = user;
    next();
  });
};

// Middleware cek API key
const verifyApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key !== config.apiKey) {
    return res.status(403).json({ message: 'API Key salah atau tidak ada' });
  }
  next();
};

module.exports = { verifyToken, verifyApiKey };
