const express = require('express');
const router = express.Router();

const bills = require('../controllers/bills');
const catchAsync = require('../utils/catchAsync');

router.route('/new')
    .post(catchAsync(bills.newBill));

router.route('/:id')
    .put(catchAsync(bills.updateBill))
    .delete(catchAsync(bills.deleteBill));

module.exports = router;