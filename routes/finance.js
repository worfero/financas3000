const express = require('express');
const finances = require('../controllers/finances');
const router = express.Router();

router.route('/')
    .get(finances.index)
    //.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

module.exports = router;