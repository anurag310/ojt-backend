const jwt =require("jsonwebtoken")
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