var mongoose = require("mongoose");
var Collection = require("../../model/blog/collectionModel")

function addCollections(req, res, next) {
  var param = req.body;
  var userId = req.cookies.userId;
  var nickName = req.cookies.nickName;

    var collection = new Collection( {
      userId: userId,
      nickName:nickName,
      title: param.title
    })

    collection.save((err,ret)=>{
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
            message:""
        });
    })
};
function getCollections(req, res, next) {
  // var param = req.body;
  var userId = req.cookies.userId;
  console.log("userId", userId);
  Collection.find({userId:userId},(err,ret)=>{
    if (err) {
        res.send({
            status: 200,
            data: ret,
            err: err,
            message:"获取失败"
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

function deleteCollection(req, res, next) {
  var userId = req.cookies.userId;
  var param = req.body;
    var id = mongoose.Types.ObjectId(`${param.id}`);
    Collection.deleteOne({ _id: id },(err,ret)=>{
        if (err) {
            res.send({
                status: 200,
                data: ret,
                err: err,
                message:"删除失败"
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
function editeCollection(req,res,next){
  // var userId = req.cookies.userId;
  var param = req.body;
    var id = mongoose.Types.ObjectId(`${param.id}`);
    var title = param.title
    var whereStr = { _id: id }
    var updateStr = {$set:{"title":title}}
    
    Collection.updateOne(whereStr,updateStr,(err,ret)=>{
        if (err) {
            res.send({
                status: 200,
                data: ret,
                err: err,
                message:"修改失败"
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
module.exports = {
  deleteCollection:deleteCollection,
  addCollections:addCollections,
  getCollections:getCollections,
  editeCollection:editeCollection
  
};