const jwt = require('jsonwebtoken');
const path = require('path');

const SECRET = process.env.JWT_SECRET || 'please_change_this_secret';

function verifyToken(req, res, next) {
  const auth = req.headers['authorization'] || req.headers['Authorization'];
  if (!auth) return res.status(401).json({ error: 'missing authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid authorization format' });
  const token = parts[1];
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'invalid token' });
    req.user = payload; // payload should include at least id
    next();
  });
}

function signToken(payload, options) {
  return jwt.sign(payload, SECRET, options || { expiresIn: '1h' });
}

module.exports = { verifyToken, signToken };
