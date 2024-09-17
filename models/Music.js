const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    posterUrl: { type: String } // New field for poster URL
});

module.exports = mongoose.model('Music', musicSchema);
