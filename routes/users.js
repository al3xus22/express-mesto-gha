const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { validateUserInfo, validateUserAvatar, validateId } = require('../middlewares/validators');
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getAuthUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getAuthUser);
router.get('/:id', validateId, getUser);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
