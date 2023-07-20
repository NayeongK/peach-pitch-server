exports.loginUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
