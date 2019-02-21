var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

/* GET home page. */
router.post("/addCollections", function(req, res, next) {
  //   db.col.update({ title: "MongoDB 教程" }, { $set: { title: "MongoDB" } });
  var param = req.body;
  var userId = req.cookies.userId;
  if (param.title) {
    var collection = {
      userId: userId,
      title: param.title
    };
    global.mongodb
      .collection("collections")
      .insertOne(collection, (err, result) => {
        if (err) {
          res.send({
            status: 200,
            data: null,
            err: "添加失败"
          });
        } else {
          global.mongodb
            .collection("collections")
            .find({ userId: userId })
            .toArray((err, result) => {
              res.send({
                status: 200,
                data: result,
                err: null
              });
            });
        }
      });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "参数不全"
    });
  }
});
router.get("/getCollections", function(req, res, next) {
  // var param = req.body;
  var userId = req.cookies.userId;
  console.log("userId", userId);
  if (userId) {
    global.mongodb
      .collection("collections")
      .find({ userId: userId })
      .toArray((err, result) => {
        if (err) {
          res.send({
            status: 200,
            data: null,
            err: err
          });
        } else if (result) {
          res.send({
            status: 200,
            // result:result,
            data: result,
            err: null
          });
        }
      });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "userId无效"
    });
  }
});
router.post("/deleteCollection", function(req, res, next) {
  var userId = req.cookies.userId;
  var param = req.body;
  if (param.id) {
    var id = mongoose.Types.ObjectId(`${param.id}`);
    var where = { userId: userId, _id: id };
    global.mongodb.collection("collections").deleteOne(where, (err, result) => {
      if (err) {
        res.send({
          status: 200,
          data: null,
          err: "删除失败"
        });
      } else {
        global.mongodb
          .collection("collections")
          .find({ userId: userId })
          .toArray((err, result) => {
            res.send({
              status: 200,
              data: result,
              err: "删除成功"
            });
          });
      }
    });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "参数不全"
    });
  }
});
router.post("/getArticleList", (req, res, next) => {
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  global.mongodb.collection("articles")
    .find({ userId: userId, collectionId: collectionId })
    .toArray((err, result) => {
      if (err) {
        res.send({
          status: 200,
          data: null,
          err: "查询失败"
        });
      } else {
        var articleList = []
        if(result.length){
          result.forEach((item)=>{
          articleList.push({
            title:item.title,
            id:item._id,
            time:item.time,
            author:item.author,
            isPublish:item.isPublish
          })
        })
        }
        res.send({
          status: 200,
          data: result,
          err: null
        });
      }
    });
});
router.post("/getArticle",(req,res,next)=>{
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  global.mongodb.collection("articles")
    .find({ userId: userId, collectionId: collectionId,_id:id})
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
})
router.post("/addNewArticle",(req,res,next)=>{
  var userId = req.cookies.userId;
  var author = req.cookies.userName;
  var collectionId = req.body.collectionId;
  var title = req.body.title;
  var isPublish = req.body.isPublish;
  var content = req.body.content
  var time = new Date().getTime()
  var article = {
    userId:userId,
    collectionId:collectionId,
    time:time,
    author:author,
    isPublish:isPublish,
    title:title,
    content:content
  }
  global.mongodb.collection("articles").insertOne(article,(err,result)=>{
    global.mongodb
      .collection("articles")
      .find({ userId: userId,collectionId:collectionId })
      .toArray((err, result) => {
        if (err) {
          res.send({
            status: 200,
            data: null,
            err: err
          });
        } else if (result) {
          res.send({
            status: 200,
            // result:result,
            data: result,
            err: null
          });
        }
      });
  })
})
router.post("/saveArticle",(req,res,next)=>{
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  var title = req.body.title
  var content = req.body.content
  var whereStr = {userId:userId,collectionId:collectionId,_id:id};  // 查询条件
  var updateStr = {$set: { "title" : title,"content":content}};
  global.mongodb.collection("articles").updateOne(whereStr, updateStr, function(err, result) {
      if (err){
        res.send({
            status: 200,
            data: null,
            err: err
          });
      }else{
        res.send({
            status: 200,
            data:"更新成功",
            err: null
          });
      }
  });
})
router.post("/publishArticle",(req,res,next)=>{
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  var title = req.body.title
  var content = req.body.content
  var whereStr = {userId:userId,collectionId:collectionId,_id:id};  // 查询条件
  var updateStr = {$set: { "title" : title,"content":content,"isPublish":true}};
  global.mongodb.collection("articles").updateOne(whereStr, updateStr, function(err, result) {
      if (err){
        res.send({
            status: 200,
            data: null,
            err: err
          });
      }else{
        res.send({
            status: 200,
            data:"发布成功",
            err: null
          });
      }
  });
})
module.exports = router;
