const users = require("../models")
const jwt = require("jsonwebtoken")

exports.register = async (req,res) =>{
    const{ name, PhoneNo ,email,password } = req.body
    const _user = new users(req.body)
    const eUser = await users.findOne({email})
    if(!eUser){
        _user.save().then(newuser => {
            return  res.status(201).json({newuser, message:"Account Created"})
          }).catch(error=>{
              return res.status(400).json({error,message:"Error Occurred"})
      
          })

    }else{
        return res.status(400).json({message:"Account already exists"})
    }
// to save
   
    console.log(req.body)
}

exports.login = async ( req,res)=>{
    const { email, password} = req.body
    const eUser = await users.findOne({email})

    if(eUser){
        
        if(eUser.password === password){


            const token = jwt.sign({
                id:eUser._id
            },"MYSECRETKEY@",{
                expiresIn:"1y"
            })
            res.status(200).json({token,message:"Login Succesfull"})

        }else{
            return res.status(401).json({message:"Email or password is incorrect"})
        }


    }else{
        return res.status(404).json({message:"user not found"})
    }
}





