const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    music: { type: mongoose.Schema.Types.ObjectId, ref: 'Music', required: true },
    listenedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);