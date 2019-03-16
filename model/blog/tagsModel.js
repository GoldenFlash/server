var mongoose = require("mongoose");
var tagsSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    title: { type: String, required: true, unique: true},
    count:{type:Number,default:0}
});
module.exports = mongoose.model("tags", tagsSchema);
