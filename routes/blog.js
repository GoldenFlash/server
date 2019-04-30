var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var users = require('../hander/blog/users') 
var article = require('../hander/blog/article') 
var collection = require('../hander/blog/collection')
var tags = require("../hander/blog/tags")

mongoose.connect("mongodb://101.132.173.11:27017/blogDatabase",{ useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connect success")
});

router.post("/users/register",users.register)
router.post("/users/login",users.login)
router.post("/users/logout",users.logout)

router.post("/article/addCollections",collection.addCollections)
router.post("/article/getCollections",collection.getCollections)
router.post("/article/deleteCollection",collection.deleteCollection)
router.post("/article/editeCollection",collection.editeCollection)

router.post("/article/getArticleList",article.getArticleList)
router.post("/article/getArticle",article.getArticle)
router.post("/article/addNewArticle",article.addNewArticle)
router.post("/article/saveArticle",article.saveArticle)
router.post("/article/publishArticle",article.publishArticle)
router.post("/article/allArticles",article.allArticles)
router.get("/article/getHotArticle",article.getHotArticle)
router.post("/article/deleteArticle",article.deleteArticle)

router.get("/article/getArticleBytags", article.getArticleBytags)

router.post("/article/articleFuzzyQuery", article.articleFuzzyQuery)

router.post("/tags/updateTags", tags.updateTags)
router.get("/tags/getTags", tags.getTags)
module.exports = router;
