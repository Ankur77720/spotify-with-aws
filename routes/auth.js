const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;