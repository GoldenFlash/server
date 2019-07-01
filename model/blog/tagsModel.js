var mongoose = require("mongoose");
var dataBase = require("../../mongodb/index")

var tagsSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    title: { type: String, required: true, unique: true},
    count:{type:Number,default:0}
});
module.exports = dataBase.blogDb.model("tags", tagsSchema);
