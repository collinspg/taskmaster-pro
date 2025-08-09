const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const teamController = require('../controllers/teamController');
const validateRequest = require('../middlewares/validateRequest');

const teamValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('members').isArray().withMessage('Members must be an array'),
  body('members.*').isMongoId().withMessage('Each member must be a valid user ID'),
  body('projects').optional().isArray(),
  body('projects.*').optional().isMongoId().withMessage('Each project must be a valid project ID'),
  body('leader').optional().isMongoId().withMessage('Leader must be a valid user ID'),
  body('createdBy').optional().isMongoId().withMessage('createdBy must be a valid user ID')
];

// POST /teams
router.post('/', teamValidationRules, validateRequest, teamController.createTeam);

// PUT /teams/:id
router.put('/:id', teamValidationRules, validateRequest, teamController.updateTeam);

// Otras rutas (sin validación)
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.delete('/:id', teamController.deleteTeam);
router.post('/:id/members', 
  [body('memberId').isMongoId().withMessage('memberId must be a valid user ID')],
  validateRequest,
  teamController.addTeamMember
);

module.exports = router;