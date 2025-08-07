const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

router.post('/', controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);
router.post('/:id/members', controller.addProjectMember);

module.exports = router;
