const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = (req, res) => {
  res.send('Logged in');
};

exports.logout = (req, res) => {
  req.logout();
  res.send('Logged out');
};