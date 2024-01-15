require('dotenv').config() //hide the ip adress of localhost
const express = require("express");
const mongoose = require("mongoose"); // Fix this line
const user = require("./src/models/user");
const { register, login, findUser } = require("./src/Controllers/authentication");
const cors = require("cors");
const { verifyToken } = require("./src/Middlewares");

const server = express();

server.use(express.json()); //middleware handel json request
server.use(cors());    // also middleware dono server ko handel krne k liye cors k use krte h khi s b hit hua vha cors k use krte h 
server.get("/", (req, res) => {   
  res.status(200).json({
    name: "Anamika",
    age: 5,
  });
});

server.post("/register", register); // routing dena ha
server.post("/login", login);   //routing dena ha
server.get("/get-user", verifyToken, findUser); //routing dena ha
const port =process.env.MONGO_DB; 
server.listen(port,()=>{console.log(`server is running on port ${port}`)}); //server kispe chlega  //kisi bhi variable ko string ma kaise store krte h uske liye $ sign aur curlry bracces use krte h back tick k sath use krte h cotes nhi


server.listen(process.env.PORT,function(){
  console.log(`Connect to port`)
})

mongoose.connect(process.env.MONGO_URL).then(() => {  //db connect krna 0.0.0.0 isliye use krte h mtlb kisi m local host use nhi hota h toh 0.0. use krte h  // abc is a db
  console.log("Database Connected");
}).catch((error) => {
  console.log(error);
});
