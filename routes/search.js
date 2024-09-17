const express = require('express');
const searchController = require('../controllers/searchController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuthenticated, searchController.searchMusic);

module.exports = router;