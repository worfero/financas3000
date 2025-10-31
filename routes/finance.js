const express = require('express');
const finance = require('../controllers/finance');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/')
    .get(catchAsync(finance.index))

router.route('/api/incomes/new')
    .post(catchAsync(finance.newIncome));

router.route('/api/incomes/:id')
    .delete(catchAsync(finance.deleteIncome));

router.route('/update')
    .put(catchAsync(finance.update));

module.exports = router;