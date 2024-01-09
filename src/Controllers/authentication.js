// const users = require("../models"); // Assuming you have a model named 'users'
const User = require("../models/user"); // Assuming your model is named 'user'
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, PhoneNo, email, password } = req.body;
  const _user = new User(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      await _user.save();
      return res.status(201).json({ newuser: _user, message: "Account Created" });
    } else {
      return res.status(400).json({ message: "Account already exists" });
    }
  } catch (error) {
    return res.status(400).json({ error, message: "Error Occurred" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const eUser = await User.findOne({ email });
    if (eUser) {
      if (eUser.password === password) {
        const token = jwt.sign({
          id: eUser._id
        }, "MYSECRETKEY@", {
          expiresIn: "1y"
        });
        res.status(200).json({ token, message: "Login Successful" });
      } else {
        return res.status(401).json({ message: "Email or password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
};