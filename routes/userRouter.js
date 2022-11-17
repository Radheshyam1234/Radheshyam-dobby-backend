const express = require("express");
const router = express.Router();

const { signUpUser, loginUser } = require("../controllers/userController");

router.route("/login").post(loginUser);
router.route("/signup").post(signUpUser);

module.exports = router;
