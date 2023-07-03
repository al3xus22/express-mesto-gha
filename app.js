const express = require('express');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect(DB_URL);

const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use((req, res, next) => {
  req.user = {
    _id: '64a1974f9cc0d458ac1e1d56',
  };
  next();
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого роута не существует' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
