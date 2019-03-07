var Article = require("../../model/blog/articleModel")

var mongoose = require("mongoose");

function getArticleList(req, res, next){
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  Article.find({ userId: userId, collectionId: collectionId },(err,ret)=>{
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err:err,
        message: "查询失败"
      });
    }
    res.send({
      status: 200,
      data: ret,
      err: err,
      message:""
    });
  })
};
function getArticle(req,res,next){
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  Article.findOne({ userId: userId, collectionId: collectionId,_id:id},(err,ret)=>{
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err: err,
        message:"查询失败"
      });
    }
    res.send({
      status: 200,
      data: ret,
      err: err,
      message:""
    });
  })
}
function allArticles(req, res, next){
  var userId = req.cookies.userId;
  Article.find({ userId: userId, isPublish: true },(err,ret)=>{
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err: err,
        message:"查询失败"
      });
    }
    res.send({
      status: 200,
      data: ret,
      err: err,
      message:""
    });
  })
};
function addNewArticle(req,res,next){
  var userId = req.cookies.userId;
  var author = req.cookies.nickName;
  var collectionId = req.body.collectionId;
  var title = req.body.title;
  var isPublish = req.body.isPublish;
  var content = req.body.content
  var time = Date.now()

  var article = new Article({
    userId:userId,
    collectionId:collectionId,
    creatTime:time,
    updateTime:time,
    author:author,
    isPublish:isPublish,
    title:title,
    content:content
  })
  article.save((err,ret)=>{
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err: err,
        message:"添加失败"
      });
    }
      
    res.send({
      status: 200,
      data: ret,
      err: err,
      message:"添加成功"
    });
        
  })
}
function saveArticle(req,res,next){
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  var title = req.body.title
  var content = req.body.content
  var whereStr = {userId:userId,collectionId:collectionId,_id:id};  // 查询条件
  var updateStr = {$set: {"updateTime":Date.now(),"title" : title,"content":content}};
  Article.update(whereStr,updateStr,(err,ret)=>{
     if (err){
        res.send({
          status: 200,
          data: ret,
          err:err,
          message:"更新失败"
        });
      }

      res.send({
        status: 200,
        data:ret,
        err: err,
        message:"保存成功"
      });
  })
}
function publishArticle(req,res,next){
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  var title = req.body.title
  var content = req.body.content
  var whereStr = {userId:userId,collectionId:collectionId,_id:id};  // 查询条件
  var updateStr = {$set: { "updateTime":Date.now(),"title" : title,"content":content,"isPublish":true}};
  Article.update(whereStr,updateStr,(err,ret)=>{
     if (err){
        res.send({
          status: 200,
          data: ret,
          err:err,
          message:"发布失败"
        });
      }

      res.send({
        status: 200,
        data:ret,
        err: err,
        message:"发布成功"
      });
  })
}
module.exports = {
  getArticleList,
  getArticle,
  addNewArticle,
  saveArticle,
  publishArticle,
  allArticles
};
