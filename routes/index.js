var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://101.132.173.11:27017/test";
var mongodb = ""
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('mongodb connect success');
    var dbase = db.db("test");
    mongodb = dbase
});


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  mongodb.collection("site"). find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });
});

module.exports = router;
