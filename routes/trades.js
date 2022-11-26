const express = require('express');
const router = express.Router();
const { addTrade, getTradeById, getTrades } = require('../controllers/trades');

router.post('/', addTrade)
router.get('/', getTrades)
router.route('/:id')
      .get(getTradeById)
      .delete((req, res) => res.status(405).send())
      .put((req, res) => res.status(405).send())
      .patch((req, res) => res.status(405).send())

module.exports = router;
