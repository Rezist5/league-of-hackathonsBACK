const express = require('express');
const TeamController = require('../controllers/TeamController');
const router = express.Router();
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/create', checkRoleMiddleware("admin"), TeamController.createTeam);

router.post('/add-member', checkRoleMiddleware("admin"),TeamController.addMember);

router.post('/remove-member', checkRoleMiddleware("admin"),TeamController.removeMember);

router.put('/:teamId', checkRoleMiddleware("admin"),  TeamController.updateTeam);

router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

module.exports = router;
