const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const auth = require('../middlewares/authMiddleware');

// Validation rules for creating/updating tasks
const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['pending', 'in progress', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601().toDate(),
  body('assignedTo').optional().isMongoId(),
  body('projectId').optional().isMongoId()
];

// Public read routes
router.get('/', taskController.getAllTasks);
router.get('/project/:projectId', taskController.getTasksByProject); 
router.get('/:id', taskController.getTaskById);

// Protected write routes (requires auth)
router.post('/', auth, taskValidationRules, validateRequest, taskController.createTask);
router.put('/:id', auth, taskValidationRules, validateRequest, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
