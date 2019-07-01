var mongoose = require("mongoose");
var blogDb = mongoose.createConnection("mongodb://101.132.173.11:27017/blogDatabase", { useCreateIndex: true });

blogDb.on('error', console.error.bind(console, 'connection error:'));
blogDb.once('open', function () {
    console.log("mongodb connect success")
});

var doutuDb = mongoose.createConnection("mongodb://101.132.173.11:27017/doutuDatabase", { useCreateIndex: true });

doutuDb.on('error', console.error.bind(console, 'connection error:'));
doutuDb.once('open', function () {
    console.log("mongodb connect success")
});
module.exports = {
    blogDb,
    doutuDb
}