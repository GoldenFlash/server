var mongoose = require("mongoose");

var collectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
    userId:{type:String,required:true},
    nickName:{type:String,required:true}
  });
module.exports = mongoose.model("collections",collectionSchema);
