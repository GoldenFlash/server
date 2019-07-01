var mongoose = require("mongoose");
var dataBase = require("../../mongodb/index")

var collectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
    userId:{type:String,required:true},
    nickName:{type:String,required:true}
  });
module.exports = dataBase.blogDb.model("collections",collectionSchema);
