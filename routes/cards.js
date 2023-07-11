const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { validateCardInfo, validateId } = require('../middlewares/validators');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', validateCardInfo, createCard);
router.get('/', getCards);
router.delete('/:cardId', validateId, deleteCard);
router.put('/:cardId/likes', validateId, likeCard);
router.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = router;
