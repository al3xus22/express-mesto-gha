const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/not-auth');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorized('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NotAuthorized('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
