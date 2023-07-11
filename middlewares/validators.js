// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const regexUrl = /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=/?&]*)/i;

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateAuthorize = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl),
  }),
});

const validateCardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

module.exports = {
  validateUserInfo,
  validateAuthorize,
  validateUserAvatar,
  validateCardInfo,
};
