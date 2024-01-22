const form = require("../models/form")
exports.addForm = async (req, res,next) => {     
 
   try {
    const { name, PhoneNo, email, password,message } = req.body;    //destructuring
    const _form = new form(req.body);
     await _form.save()
     req.subject="user Registration"
      req.text="you have successfully signed up"

      next()
     res.status(200).json({message :"form has been submitted"})
   } catch(error) {
    console.log(error)
    res.status(400).json({message :"error found"})
   }
 };
