module.exports = (req, res, next) => {
  const adminKey = req.get("adminKey");
  if (adminKey === process.env.ADMIN_KEY) {
    next();
  } else
    res
      .status(403)
      .send({ message: "NOT ALL ALLOWED", error: "invalid admin key "+adminKey });
};
