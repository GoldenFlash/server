var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    collectionId:{type:String,required: true},
    creatTime:{ type: Date, default: Date.now()},
    updateTime:{ type: Date, default: Date.now()},
    author:{ type: String, default:""},
    title:{ type: String, default:""},
    tags:{type:Array,default:[]},
    content:{ type: String, default:""},
    isPublish:{ type: Boolean, default:false},
    comment:{type:Array,default:[]}
  });
module.exports = mongoose.model("articles",articleSchema);
