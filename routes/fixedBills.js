const express = require('express');
const router = express.Router();

const fixedBills = require('../controllers/fixedBills');
const catchAsync = require('../utils/catchAsync');

router.route('/new')
    .post(catchAsync(fixedBills.newFixedBill));

router.route('/:id')
    .put(catchAsync(fixedBills.updateFixedBill))
    .delete(catchAsync(fixedBills.deleteFixedBill));

module.exports = router;