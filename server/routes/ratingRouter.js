const express = require('express');
const RatingController = require('../controllers/RatingController');
const router = express.Router();

router.post('/add-or-update', RatingController.addOrUpdateRating);

router.get('/:hackathonId', RatingController.getRatingsByHackathon);

module.exports = router;
