const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/add-music', isAuthenticated, favoritesController.addFavoriteMusic);
router.post('/remove-music', isAuthenticated, favoritesController.removeFavoriteMusic);
router.get('/music', isAuthenticated, favoritesController.getFavoriteMusic);

router.post('/add-artist', isAuthenticated, favoritesController.addFavoriteArtist);
router.post('/remove-artist', isAuthenticated, favoritesController.removeFavoriteArtist);
router.get('/artists', isAuthenticated, favoritesController.getFavoriteArtists);

module.exports = router;