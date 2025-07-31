const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');

// Validaciones comunes
const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Invalid date'),
  body('assignedTo').optional().isMongoId().withMessage('assignedTo must be a valid user ID'),
  body('projectId').optional().isMongoId().withMessage('projectId must be a valid project ID')
];

// POST /tasks
router.post('/', taskValidationRules, validateRequest, taskController.createTask);

// PUT /tasks/:id
router.put('/:id', taskValidationRules, validateRequest, taskController.updateTask);

// Rutas sin validación
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
