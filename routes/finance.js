const express = require('express');
const finance = require('../controllers/finance');
const catchAsync = require('../utils/catchAsync');
const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.route('/')
    .get(requiresAuth(), catchAsync(finance.index))

module.exports = router;