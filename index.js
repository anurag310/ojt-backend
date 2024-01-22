require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const { register, login, findUser } = require("./src/Controllers/authentication");
const cors = require("cors");
const { verifyToken, isvalidated, validatedform } = require("./src/Middlewares");
const {addForm} = require('./src/Controllers/form');
const { sendEmail } = require('./src/Helper/Email');
const http =require("http")
const {Server} = require ("socket.io")

const server = express();
const app = http.createServer(server)
const io = new Server(app)

server.use(express.json());
server.use(cors());

// Define the GET route
server.get("/", (req, res) => {
  res.status(200).json({
    name: "Anamika",
    age: 5,
  });
});

// Define the POST routes outside the GET callback
server.post("/register", register,sendEmail);
server.post("/login", login);

server.get("/get-user", verifyToken, findUser);
server.post("/form", validatedform, isvalidated, addForm);

const port = process.env.PORT || 3000;
io.on("connection",socket =>{
  console.log("new user connected");
  socket.on("message",(message,room)=>{
    console.log(`new message recieved in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
  }) // socket p koi trigger krega toh ye run ho jayega


  socket.on("join",(room)=>{ // 2 
    console.log(room);
    socket.join(room)
    socket.emit("joined") // emit msg ko bjehne  e k liye on msg receive krne k liye
  })
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database Connected");
}).catch((error) => {
  console.log(error);
});
