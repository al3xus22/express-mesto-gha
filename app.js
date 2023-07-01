const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '5649b276f950867867851e88a',
  };
  next();
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (res, req) => {
  res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});