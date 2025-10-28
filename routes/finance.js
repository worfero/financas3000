const express = require('express');
const finance = require('../controllers/finance');
const router = express.Router();

router.route('/')
    .get(finance.index)

router.route('/update')
    .put(finance.update);

module.exports = router;