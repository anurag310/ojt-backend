const jwt =require("jsonwebtoken")
const {check,validationResult} = require("express-validator")
exports.verifyToken=(req,res,next)=>{
    try{
            const token = req.headers.authorization

            console.log(token);
            if(token){
                const data = jwt.verify( token,"MYSECRETKEY@")
               // console.log("data")
               const {id} = data; //destructing and extracting id from data
               req.id = id;
                    next();
              //  return res.status(200).json({data})

            }else{
                return res.status(401).json({message:"Token is missing"})
            }
    }catch(err){
        return res.status(401).json({err})


    }
}


exports.validatedform = [ //  ye check krta h jo data hum enter kiye h vo schema m h ya nhi

        check("name").notEmpty().withMessage("please enter your name"), ///express validator work on it
        check("email").isEmail().withMessage("enter valid email"),
        check("password").isStrongPassword().withMessage("enter 8 digit password"),
        check("PhoneNo").isMobilePhone().withMessage("number upto 10 digit"),
        check("message").notEmpty().withMessage("enter a message")
        
    
]
exports.isvalidated =(req,res,next) => { // jo data hum dale h  jo check krta h vo validate h ya nhi
    const errors = validationResult(req)  //callback function


    if(errors.isEmpty()){
        next()

    }else{
        res.status(400).json({message:errors.array()[0]})
    }
}
