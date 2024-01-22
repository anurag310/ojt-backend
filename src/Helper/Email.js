const nodemailer =require("nodemailer")


exports.sendEmail =(req,res)=>{
        try{
            const transport = nodemailer.createTransport({

                service:"gmail",  //product of email
                host:"smtp.gmail.com",
                port:465,
                auth:{
                    user:"",
                    password :"" //jo generate hoga google svo dalna h

                }
            })

            const data={
                from:"",
                to:req.body.email,
                subject:req.subject,
                text:req.text,
            }
            transport.sendMail((data,info )=> {
                    if(error){
                        console.log(error);
                        res.status(400).json({message:"email delivery error"})
                    }
                    else{
                        console.log(info);
                        res.status(200).json({message:"success"})
                    }
            })
              
        }catch(error){
        
        }
}