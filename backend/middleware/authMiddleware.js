const protect = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized, please login' });
    }
};

module.exports = { protect };
