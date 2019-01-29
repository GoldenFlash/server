var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/articleList", function(req, res, next) {
  console.log(req);
  global.mongodb
    .collection("site")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});
router.get("/addCollects", function(req, res, next) {
  dbo.collection("site").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("文档插入成功");
    db.close();
  });
});

module.exports = router;
