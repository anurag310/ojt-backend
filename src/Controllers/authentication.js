// const users = require("../models"); // Assuming you have a model named 'users'
const User = require("../models/user"); // Assuming your model is named 'user'
const jwt = require("jsonwebtoken");


var bcrypt = require("bcryptjs"); 

exports.register = async (req, res,next) => {     // async ka mtlb asynchronous koi b code block na ho jo code tym le rha h vo chlta rhe backend m jb tk uska kaam khtam na ho jata
   const { name, PhoneNo, email, password } = req.body;  
  //const _user = new User(req.body);
  const _user = new User({   //schema m value store ho rha h req.body vala
    name: req.body.name,
    PhoneNo:req.body.PhoneNo,
    email: req.body.email,
    role:req.body.role,
    password: bcrypt.hashSync(req.body.password, 8)   //bcrypt module h humara  hashsync  method jo password ko encrypt kr rha h  secuire kitne  round sequre krna h  
  });
  try {
    const existingUser = await User.findOne({ email }); // async k sath await use hota h mtlb yha ruko
    if (!existingUser) {
      await _user.save();   //sare humra method save krta h data  mongodb m
      // req.subject="user Registration"
      // req.text="you have successfully signed up"

        next()

     // return res.status(201).json({ newuser: _user, message: "Account Created" });  //har api k reponse ata 
   // } else {
     // return res.status(400).json({ message: "Account already exists" }); 
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
        const passwordIsValid = bcrypt.compareSync(req.body.password, eUser.password); //compare sync compare krta h jo password de rha h vo password h ki nhi // reture true or false onle
        console.log(passwordIsValid);
        if (!passwordIsValid) { 
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
      if (passwordIsValid) {
        const token = jwt.sign({   // sign means token generate krna sign method s id bheji aur secret key 
          id: eUser._id // us user ki id k base pr kr rhe h jo db s mili 
        }, "MYSECRETKEY@", { // secret key kuch b likh sakte h 
          expiresIn: "1h" // vo token kb tk chlega
        });
        res.status(200).json({  message: "Login Successful" ,eUser,token});
      } else {
        return res.status(401).json({ message: "Email or password is incorrect" }); // 40 1 unauthorised uske pass token nhi h
            }
    } else {
      return res.status(404).json({ message: "User not found" }); // 404 no content formed 
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Internal Server Error" });  //  500 internal server error code m mistake h 
  }
};
exports.findUser =async(req,res)=>{
  // const user = users.findOne({_id:req.id})
  const user = await User.findById(req.id)
  return res.status(200).json({user})
}

    
