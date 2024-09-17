const Album = require('../models/Album');

exports.createAlbum = async (req, res) => {
    try {
        if (req.user.role !== 'artist') {
            return res.status(403).send('Only artists can create albums');
        }
        const { title, genre, songs } = req.body;
        const posterUrl = req.file ? req.file.location : null; // URL of the uploaded poster file in S3
        const album = new Album({ title, artist: req.user._id, posterUrl, genre, songs });
        await album.save();
        res.status(201).send('Album created');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getAlbums = async (req, res) => {
    try {
        const albums = await Album.find().populate('artist', 'username').populate('songs');
        res.status(200).json(albums);
    } catch (err) {
        res.status(400).send(err.message);
    }
};