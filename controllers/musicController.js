const Music = require('../models/Music');

exports.uploadMusic = async (req, res) => {
    try {
        if (req.user.role !== 'artist') {
            return res.status(403).send('Only artists can upload music');
        }
        const { title, album, genre } = req.body;
        const url = req.files.music[ 0 ].location; // URL of the uploaded music file in S3
        const posterUrl = req.files.poster ? req.files.poster[ 0 ].location : null; // URL of the uploaded poster file in S3
        const music = new Music({ title, artist: req.user._id, url, album, genre, posterUrl });
        await music.save();
        res.status(201).send('Music uploaded');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getMusic = async (req, res) => {
    try {
        const music = await Music.find().populate('artist', 'username');
        res.status(200).json(music);
    } catch (err) {
        res.status(400).send(err.message);
    }
};