var mongoose = require("mongoose");
var dataBase = require("../../mongodb/index")

var userSchema = new mongoose.Schema({
    nickName:{type:String,required:true},
    account:{type:String,required: true,unique: true},
    passWord:{type:String,required:true},
    registerTime:{ type: Date, default: Date.now()},
    signature:{ type: String, default:""},
    auth:{type:String,default:"2"}
  });
module.exports = dataBase.blogDb.model("users",userSchema);
