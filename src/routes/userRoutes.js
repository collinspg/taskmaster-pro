const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');

// Validaciones comunes
const userValidationRules = [
  body('googleId').notEmpty().withMessage('googleId is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
  body('role').optional().isIn(['admin', 'manager', 'user']).withMessage('Invalid role')
];

// POST /users
router.post('/', userValidationRules, validateRequest, userController.createUser);

// PUT /users/:id
router.put('/:id',
  [
    body('googleId').optional().isString(),
    body('name').optional().isString().notEmpty(),
    body('email').optional().isEmail(),
    body('avatar').optional().isURL(),
    body('role').optional().isIn(['admin', 'manager', 'user'])
  ],
  validateRequest,
  userController.updateUser
);

// Rutas sin validación
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router;
