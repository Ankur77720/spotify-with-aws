const express = require('express');
const albumController = require('../controllers/albumController');
const { isAuthenticated, isArtist } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/create', isAuthenticated, isArtist, upload.single('poster'), albumController.createAlbum);
router.get('/', isAuthenticated, albumController.getAlbums);

module.exports = router;