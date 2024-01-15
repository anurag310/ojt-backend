const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); //file jo db connect kr rha h

const user = new mongoose.Schema({ //schema kis type k vale hoga schema means table kis type k hoga 
  name: {
    type: String,
    required: true,  //validation 
  },
  PhoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Fix the typo here, change 'require' to 'required'
  },
});

//user.virtual('password').set(function (password) {
 // this.hash_password = bcrypt.hashSync(password, 10);
//});

//user.methods = {
  //authenticate: function (password) {
    //console.log(password);
    //return bcrypt.compareSync(password, this.hash_password);
  //},
//};

module.exports = mongoose.model('User', user); // schema use kr rhe h user naam k table m store kr rhe h 
/* sbse pehle db connect krne k liye connect method k use hota h 
fir use hota h mongoose.schema kis kis trah ki fields hogi
model ka use krte ha jo save krta h mongoose konse  fields s */ 