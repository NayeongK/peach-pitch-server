const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/authenticate");
const { loginUser } = require("../controllers/loginController");

router.route("/").post(authenticate, loginUser);

module.exports = router;
