const express = require('express');
const musicController = require('../controllers/musicController');
const { isAuthenticated, isArtist } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', isAuthenticated, isArtist, upload.fields([ { name: 'music', maxCount: 1 }, { name: 'poster', maxCount: 1 } ]), musicController.uploadMusic);
router.get('/', isAuthenticated, musicController.getMusic);

module.exports = router;