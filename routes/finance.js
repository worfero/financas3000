const express = require('express');
const finance = require('../controllers/finance');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/')
    .get(catchAsync(finance.index))

module.exports = router;