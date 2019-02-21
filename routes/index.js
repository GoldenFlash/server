var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
router.post("/allArticles", (req, res, next) => {
  var userId = req.cookies.userId;
  global.mongodb
    .collection("articles")
    .find({ userId: userId, isPublish: true })
    .toArray((err, result) => {
      if (err) {
        res.send({
          status: 200,
          data: null,
          err: "查询失败"
        });
      } else {
        res.send({
          status: 200,
          data: result,
          err: null
        });
      }
    });
});
module.exports = router;
