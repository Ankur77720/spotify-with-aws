const Music = require('../models/Music');

exports.searchMusic = async (req, res) => {
    try {
        const { query } = req.query;
        const music = await Music.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { album: new RegExp(query, 'i') },
                { genre: new RegExp(query, 'i') }
            ]
        }).populate('artist', 'username');
        res.status(200).json(music);
    } catch (err) {
        res.status(400).send(err.message);
    }
};