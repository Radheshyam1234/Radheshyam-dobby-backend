const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utilities/generateToken");

const signUpUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist != null) {
      return res.json({
        message: "User Already exist",
      });
    }
    let hashedPassword = await bcrypt.hash(password, 12);
    const NewUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await NewUser.save();

    const token = generateToken(NewUser._id);
    res.status(201).json({
      response: {
        NewUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(403).json({ message: "Email or password is incorrect!" });
    } else {
      bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          const token = generateToken(user._id);
          res.status(201).json({
            response: {
              user,
              token,
            },
          });
        } else {
          res.status(403).json({ message: "Password is incorrect!" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
