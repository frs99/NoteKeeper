const jwt = require('jsonwebtoken');

const JWT_SECRET = 'frs99';

module.exports = (req, res, next) => {
  const token = jwt.sign({ foo: 'bar' }, JWT_SECRET, { expiresIn: '1h' });
  req.token = token
  next();
}