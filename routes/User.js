const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// Register
router.post('/', registerUser);

// Login
router.post('/login', loginUser);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;
