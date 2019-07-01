var mongoose = require("mongoose");
var dataBase = require("../../mongodb/index")
var imagesSchema = new mongoose.Schema({
    creatTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() },
    title: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    content: { type: String, default: "" },
    
});
module.exports = dataBase.doutuDb.model("images", imagesSchema);
