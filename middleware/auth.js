exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('You need to be logged in to access this resource');
};

exports.isArtist = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'artist') {
        return next();
    }
    res.status(403).send('You need to be an artist to perform this action');
};