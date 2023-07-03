const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Поле не должно быть короче 2 или длиннее 30 символов либо не заполнено' });
      } else {
        res.status(500).send(err);
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка получения данных пользователей' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new Error('InvalidUserId'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'InvalidUserId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка получения данных пользователя' });
      }
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка получения данных пользователя' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  if (!req.body.avatar) {
    return res.status(400).send({ message: 'Поле avatar не заполнено' });
  }
  return updateUser(req, res);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
};
