const express = require('express');
const HackathonController = require('../controllers/HackathonController');
const router = express.Router();

router.post('/create', checkRoleMiddleware("admin"),HackathonController.createHackathon);

router.post('/add-team', checkRoleMiddleware("admin"),HackathonController.addTeamToHackathon);

router.post('/remove-team',checkRoleMiddleware("admin"), HackathonController.removeTeamFromHackathon);

router.put('/:hackathonId',checkRoleMiddleware("admin"),  HackathonController.updateHackathon);

router.get('/', HackathonController.getAllHackathons);

router.get('/:id', HackathonController.getHackathonById);

module.exports = router;
