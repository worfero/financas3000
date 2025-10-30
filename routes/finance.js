const express = require('express');
const finance = require('../controllers/finance');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/')
    .get(catchAsync(finance.index))

router.route('/new')
    .put(catchAsync(finance.new));

router.route('/update')
    .put(catchAsync(finance.update));

module.exports = router;