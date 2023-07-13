const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../controllers/users');
const NotAuthorized = require('../errors/not-auth');

const extractToken = (header) => header.replace('jwt=', '');

const auth = (req, res, next) => {
  console.log(req.cookies);

  if (!req.headers.cookie || !req.headers.cookie.startsWith('jwt=')) {
    next(new NotAuthorized('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(extractToken(req.headers.cookie), JWT_SECRET);
  } catch (err) {
    next(new NotAuthorized('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
