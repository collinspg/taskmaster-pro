const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const projectController = require('../controllers/projectController');
const validateRequest = require('../middlewares/validateRequest');
const auth = require('../middlewares/auth');


const projectValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('members').optional().isArray(),
  body('members.*').optional().isMongoId().withMessage('Each member must be a valid user ID'),
  body('createdBy').optional().isMongoId().withMessage('createdBy must be a valid user ID')
];

// POST /projects
router.post('/', auth, projectValidationRules, validateRequest, projectController.createProject);

// PUT /projects/:id
router.put('/:id', auth, projectValidationRules, validateRequest, projectController.updateProject);

// Otras rutas (sin validación)
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/members', 
  [body('memberId').isMongoId().withMessage('memberId must be a valid user ID')],
  validateRequest,
  projectController.addProjectMember
);

module.exports = router;
