const User = require('../models/User');

exports.addFavoriteMusic = async (req, res) => {
    try {
        const { musicId } = req.body;
        const user = await User.findById(req.user._id);
        user.favorites.push(musicId);
        await user.save();
        res.status(200).send('Music added to favorites');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.removeFavoriteMusic = async (req, res) => {
    try {
        const { musicId } = req.body;
        const user = await User.findById(req.user._id);
        user.favorites.pull(musicId);
        await user.save();
        res.status(200).send('Music removed from favorites');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getFavoriteMusic = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');
        res.status(200).json(user.favorites);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.addFavoriteArtist = async (req, res) => {
    try {
        const { artistId } = req.body;
        const user = await User.findById(req.user._id);
        user.favoriteArtists.push(artistId);
        await user.save();
        res.status(200).send('Artist added to favorites');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.removeFavoriteArtist = async (req, res) => {
    try {
        const { artistId } = req.body;
        const user = await User.findById(req.user._id);
        user.favoriteArtists.pull(artistId);
        await user.save();
        res.status(200).send('Artist removed from favorites');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getFavoriteArtists = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favoriteArtists');
        res.status(200).json(user.favoriteArtists);
    } catch (err) {
        res.status(400).send(err.message);
    }
};