require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./config');
const cors = require('cors'); // Add this line

const authRoutes = require('./routes/auth');
const musicRoutes = require('./routes/music');
const playlistRoutes = require('./routes/playlist');
const searchRoutes = require('./routes/search');
const historyRoutes = require('./routes/history');
const favoritesRoutes = require('./routes/favorites');
const albumRoutes = require('./routes/album'); // New album routes

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/music-streaming-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/music', musicRoutes);
app.use('/playlist', playlistRoutes);
app.use('/search', searchRoutes);
app.use('/history', historyRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/album', albumRoutes); // Use album routes

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});