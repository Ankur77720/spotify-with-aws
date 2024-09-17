const express = require('express');
const historyController = require('../controllers/historyController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/add', isAuthenticated, historyController.addHistory);
router.get('/', isAuthenticated, historyController.getHistory);

module.exports = router;