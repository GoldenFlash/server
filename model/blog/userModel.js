var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    nickName: String,
    account:String,
    passWord:String,
    registerTime:String,
    signature:String
  });
module.exports = mongoose.model("users",userSchema);
