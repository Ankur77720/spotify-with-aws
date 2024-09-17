const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
    try {
        const { name, songs } = req.body;
        const playlist = new Playlist({ name, user: req.user._id, songs });
        await playlist.save();
        res.status(201).send('Playlist created');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
        res.status(200).json(playlists);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).send('Playlist not found');
        }
        if (playlist.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }
        playlist.songs.push(songId);
        await playlist.save();
        res.status(200).send('Song added to playlist');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).send('Playlist not found');
        }
        if (playlist.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }
        playlist.songs.pull(songId);
        await playlist.save();
        res.status(200).send('Song removed from playlist');
    } catch (err) {
        res.status(400).send(err.message);
    }
};