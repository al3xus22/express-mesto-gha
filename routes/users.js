const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { validateUserInfo, validateUserAvatar } = require('../middlewares/validators');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getAuthUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getAuthUser);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);
router.get('/:id', getUser);

module.exports = router;
