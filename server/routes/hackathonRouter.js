const express = require('express');
const HackathonController = require('../controllers/HackathonController');
const router = express.Router();

router.post('/create', HackathonController.createHackathon);

router.post('/add-team', HackathonController.addTeamToHackathon);

router.post('/remove-team', HackathonController.removeTeamFromHackathon);

router.put('/:hackathonId', HackathonController.updateHackathon);

router.get('/', HackathonController.getAllHackathons);

router.get('/:id', HackathonController.getHackathonById);

module.exports = router;
