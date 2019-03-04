var mongoose = require("mongoose");

var collectionSchema = new mongoose.Schema({
    title:String
  });
module.exports = mongoose.model("collections",collectionSchema);
