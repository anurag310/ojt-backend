const form = require("../models/form")
exports.addForm = async (req, res,next) => {     
 
   try { // try m koi b error ho toh vo catch kr leta h tabhi hum try catch use krte h
    const { name, PhoneNo, email, password,message } = req.body;    //destructuring
    const _form = new form(req.body);
     await _form.save() // Calling the save method on the _form object
     req.subject="user Registration"
      req.text="you have successfully signed up"

      next()
     res.status(200).json({message :"form has been submitted"})
   } catch(error) {
    console.log(error)
    res.status(400).json({message :"error found"})
   }
 };
