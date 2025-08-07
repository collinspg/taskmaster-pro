const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamController');

router.post('/', controller.createTeam);
router.get('/', controller.getAllTeams);
router.get('/:id', controller.getTeamById);
router.put('/:id', controller.updateTeam);
router.delete('/:id', controller.deleteTeam);
router.post('/:id/members', controller.addTeamMember);

module.exports = router;