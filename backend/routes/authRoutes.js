const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');

// Authentication routes
router.post('/login', authUser);
router.post('/register', registerUser);

module.exports = router;
