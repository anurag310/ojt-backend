const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  PhoneNo: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
    //password:{
      //  type:String,
     // required:true
    //}
  hash_password: {
    type: String,
    require: true
  }
})
user.virtual('password').set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10) // pass hash_password through virtual function
})
user.methods = {
  //methods k ander authenticate naam k function bna hua h
  authenticate: function (password) {
    console.log(password)
    // passing a function we are not creating a function inside authenticate is a function
    return bcrypt.compareSync(password, this.hash_password) // decrypt the data automatically//kisi data k ander kuch find krna h then use this
  }
}
module.exports = mongoose.model('Users', user) //user is mongoose schema

// {
//     "name": "Kirti",
//     "phoneNumber":9508042959,
//     "email":"kirtipriya1753@gmail.com"

// }
