const History = require('../models/History');

exports.addHistory = async (req, res) => {
    try {
        const { musicId } = req.body;
        const history = new History({ user: req.user._id, music: musicId });
        await history.save();
        res.status(201).send('History added');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await History.find({ user: req.user._id }).populate('music');
        res.status(200).json(history);
    } catch (err) {
        res.status(400).send(err.message);
    }
};