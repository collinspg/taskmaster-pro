const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamController');

const auth = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

// Public read
router.get('/', controller.getAllTeams);
router.get('/:id', controller.getTeamById);

// Protected writes with role checks
router.post('/', auth, requireRole('manager', 'admin'), controller.createTeam);
router.put('/:id', auth, requireRole('manager', 'admin'), controller.updateTeam);
router.delete('/:id', auth, requireRole('admin'), controller.deleteTeam);

// Add team member - manager+admin only
router.post('/:id/members', auth, requireRole('manager', 'admin'), controller.addTeamMember);

module.exports = router;
