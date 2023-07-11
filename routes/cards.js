const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { validateCardInfo } = require('../middlewares/validators');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', validateCardInfo, createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
