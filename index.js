const express = require("express")
const { default: mongoose } = require("mongoose")
const user = require("./src/models/user")
const { register, login } = require("./src/Controllers/authentication")
const  cors =require("cors")


const server = express()


server.use( express.json())
server.use(cors())
server.get("/",(req,res)=>{


//    res.send("Success")
    res.status(200).json({
        name:"Anamika",
        age:5
    })
})
// server.post("/register",(req,res)=>{
//     const{ name, phoneNumber ,email } = req.body
//     const _user = new users(req.body)
// _user.save()
//console.log(req.body)
// })

server.post("/register",register)
server.post("/login",login)

server.listen("3000")

// for connecting database 
mongoose.connect("mongodb://localhost:27017/ABC").then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log(error)
})