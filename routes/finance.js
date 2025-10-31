const express = require('express');
const finance = require('../controllers/finance');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/')
    .get(catchAsync(finance.index))

router.route('/api/incomes/new')
    .post(catchAsync(finance.newIncome));

router.route('/api/fixed-bills/new')
    .post(catchAsync(finance.newFixedBill));

router.route('/api/incomes/:id')
    .put(catchAsync(finance.updateIncome))
    .delete(catchAsync(finance.deleteIncome));

router.route('/api/fixed-bills/:id')
    .put(catchAsync(finance.updateFixedBill))
    .delete(catchAsync(finance.deleteFixedBill));

module.exports = router;