const express = require('express');
const TeamController = require('../controllers/TeamController');
const router = express.Router();

router.post('/create', TeamController.createTeam);

router.post('/add-member', TeamController.addMember);

router.post('/remove-member', TeamController.removeMember);

router.put('/:teamId', TeamController.updateTeam);

router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

module.exports = router;
