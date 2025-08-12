const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

const auth = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware'); 

// Public read routes
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);

// Protected write routes (requires authentication)
router.post('/', auth, controller.createProject);
router.put('/:id', auth, controller.updateProject);
router.delete('/:id', auth, controller.deleteProject);

// Add project member - restricted to users with role 'manager' or 'admin'
router.post('/:id/members', auth, requireRole('manager', 'admin'), controller.addProjectMember);

module.exports = router;
