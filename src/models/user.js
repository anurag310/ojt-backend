const mongoose = require("mongoose")
const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true   
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Users",user)

// {
//     "name": "Kirti",
//     "phoneNumber":9508042959,
//     "email":"kirtipriya1753@gmail.com"
    
// }