module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.userId = req.user._id; // Make user ID available in controllers
    return next();
  }
  res.status(401).json({ error: 'Unauthorized - Please log in' });
};