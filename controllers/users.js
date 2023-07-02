const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка при создании пользователя' });
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
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка получения данных пользователя' });
      }
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка обновления данных пользователя' });
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
