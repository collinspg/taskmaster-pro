const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const auth = require('../middlewares/authMiddleware');

// Protect POST (create user) with auth middleware
router.post('/',
  auth,
  [
    body('googleId').notEmpty().withMessage('googleId is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  validateRequest,
  userController.createUser
);

// Protected updates/deletes (user can update own profile or admin)
router.put('/:id',
  auth,
  validateRequest,
  userController.updateUser
);

router.delete('/:id',
  auth,
  userController.deleteUser
);

// Public reads (or protect if you want private data)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
