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
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  Article.findOne({_id:id},(err,ret)=>{
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
  Article.find({ userId: userId, isPublish: true })
  .sort({ 'creatTime': -1 })
  .exec((err, ret) => {
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err: err,
        message: "查询失败"
      });
    }
    res.send({
      status: 200,
      data: ret,
      err: err,
      message: ""
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
function deleteArticle(req,res,next){
  var userId = req.cookies.userId;
  var collectionId = req.body.collectionId;
  var id = mongoose.Types.ObjectId(`${req.body.id}`);
  var title = req.body.title
  var content = req.body.content
  var whereStr = {userId:userId,collectionId:collectionId,_id:id};  // 查询条件
  Article.deleteOne(whereStr,(err,ret)=>{
     if (err){
        res.send({
          status: 200,
          data: ret,
          err:err,
          message:"删除失败"
        });
      }

      res.send({
        status: 200,
        data:ret,
        err: err,
        message:"删除成功"
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
function getHotArticle(req,res,next){
  var keyWord = req.query.keyWord
  var whereStr
  if(keyWord){
    whereStr={
      $or: [
        { 'title': { '$regex': keyWord, $options: '$i' } },
        { 'tags': keyWord },
        { 'author': { '$regex': keyWord, $options: '$i' } }],
         isPublish: true,
    }
  }else{
   whereStr = { isPublish: true }
  }
  Article.find(whereStr)
    .sort({ 'creatTime': -1 })
    .exec((err, ret) => {
      if (err) {
        res.send({
          status: 200,
          data: ret,
          err: err,
          message: "查询失败"
        });
      }
      res.send({
        status: 200,
        data: ret,
        err: err,
        message: ""
      });
    })
}
function getArticleBytags(req, res, next) {
  var tag = req.query.tag
  Article.find({ isPublish: true, tags: { $elemMatch: { $eq: tag } } })
  .sort({ 'creatTime': -1 })
  .exec((err, ret) => {
    if (err) {
      res.send({
        status: 200,
        data: ret,
        err: err,
        message: "查询失败"
      });
    }
    res.send({
      status: 200,
      data: ret,
      err: err,
      message: ""
    });
  })
}
function articleFuzzyQuery(req,res,next){
  var keyWord = req.body.keyWord

  Article.find({
    $or: [
      { 'title': { '$regex': keyWord, $options: '$i' } },
      { 'tags': keyWord },
      { 'author': { '$regex': keyWord, $options: '$i' } }],
       isPublish: true,
  }).sort({ 'creatTime': -1 }).exec(function (err, ret) {
      if (err) {
        res.send({
          status: 200,
          data: ret,
          err: err,
          message: "查询失败"
        });
      } else {
        res.send({
          status: 200,
          data: ret,
          err: err,
          message: ""
        });
      }
    })

}
module.exports = {
  getArticleList,
  getArticle,
  getHotArticle,
  addNewArticle,
  saveArticle,
  publishArticle,
  allArticles,
  deleteArticle,
  getArticleBytags,
  articleFuzzyQuery
};
