const express = require('express');
const playlistController = require('../controllers/playlistController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/create', isAuthenticated, playlistController.createPlaylist);
router.get('/', isAuthenticated, playlistController.getPlaylists);
router.post('/add-song', isAuthenticated, playlistController.addSongToPlaylist);
router.post('/remove-song', isAuthenticated, playlistController.removeSongFromPlaylist);

module.exports = router;