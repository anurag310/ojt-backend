// const users = require("../models"); // Assuming you have a model named 'users'
const User = require("../models/user"); // Assuming your model is named 'user'
const jwt = require("jsonwebtoken");


var bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, PhoneNo, email, password } = req.body;
  //const _user = new User(req.body);
  const _user = new User({
    name: req.body.name,
    PhoneNo:req.body.PhoneNo,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
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
        const passwordIsValid = bcrypt.compareSync(req.body.password, eUser.password);
        console.log(passwordIsValid);
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
      if (passwordIsValid) {
        const token = jwt.sign({
          id: eUser._id
        }, "MYSECRETKEY@", {
          expiresIn: "1h"
        });
        res.status(200).json({  message: "Login Successful" ,eUser,token});
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
exports.findUser =async(req,res)=>{
  // const user = users.findOne({_id:req.id})
  const user = await User.findById(req.id)
  return res.status(200).json({user})
}