const express = require('express');
const router = express.Router();

const incomes = require('../controllers/incomes');
const catchAsync = require('../utils/catchAsync');

router.route('/new')
    .post(catchAsync(incomes.newIncome));

router.route('/:id')
    .put(catchAsync(incomes.updateIncome))
    .delete(catchAsync(incomes.deleteIncome));

module.exports = router;