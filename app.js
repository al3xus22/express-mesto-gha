const express = require('express');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { validateUserInfo, validateAuthorize } = require('./middlewares/validators');

mongoose.connect(DB_URL);

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.post('/signup', validateUserInfo, createUser);
app.post('/signin', validateAuthorize, login);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такоой страницы не существует'));
});
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
