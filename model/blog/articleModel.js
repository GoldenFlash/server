var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    collectionId:{type:String,required: true},
    time:{ type: Date, default: Date.now()},
    author:{ type: String, default:""},
    title:{ type: String, default:""},
    content:{ type: String, default:""},
    isPublish:{ type: Boolean, default:false},
  });
module.exports = mongoose.model("articles",articleSchema);
