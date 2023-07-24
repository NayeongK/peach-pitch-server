function loginUser(req, res, next) {
  try {
    res.status(200).json({
      result: "ok",
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = loginUser;
