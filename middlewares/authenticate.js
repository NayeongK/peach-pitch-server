const firebaseAdmin = require("../configs/firebase");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
  let user = await User.findOne({ email: decodedToken.email });

  try {
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user) {
      user = new User({
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      });

      await user.save();
    }
    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};
