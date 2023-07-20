exports.loginUser = async (req, res) => {
  try {
    res.status(200).json({
      result: "ok",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
