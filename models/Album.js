const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    posterUrl: { type: String }, // New field for album poster URL
    genre: { type: String },
    songs: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Music' } ]
});

module.exports = mongoose.model('Album', albumSchema);