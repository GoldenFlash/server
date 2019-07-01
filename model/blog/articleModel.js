var mongoose = require("mongoose");
var dataBase = require("../../mongodb/index")

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
    comment:{type:Array,default:[]},
    view:{type:Number,default:0},
    image: { type: String, default:"https://github.com/GoldenFlash/blog/blob/master/img/a1.jpg?raw=true"}
  });
module.exports = dataBase.blogDb.model("articles",articleSchema);

