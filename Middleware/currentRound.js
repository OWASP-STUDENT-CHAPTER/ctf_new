module.exports = (req, res, next) => {
  req.currentRound = req.app.get('event').currentRound;
  next();
};
