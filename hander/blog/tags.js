var mongoose = require("mongoose");
var Article = require("../../model/blog/articleModel")
var Tags = require("../../model/blog/tagsModel")
function updateTags(req,res,next){

    var userId = req.cookies.userId;
    var collectionId = req.body.collectionId;
    var id = mongoose.Types.ObjectId(`${req.body.id}`);
    var title = req.body.title

    var whereStr = { userId: userId, collectionId: collectionId, _id: id };  // 查询条件
    var updateStr = { $set: { "updateTime": Date.now() }, $push: {"tags": tags }};

    Article.updateOne(whereStr, updateStr,(err,ret)=>{
        if(err){
            res.send({
                status: 200,
                data: ret,
                err: err,
                message: "更新失败"
            });
        }
        res.send({
            status: 200,
            data: ret,
            err: err,
            message: "更新成功"
        });
    })

    var tags = new Tags({
        userId:userId,
        title: title,
        count:1
    })

    tags.save((err,ret)=>{
        if(err){
            var whereTags = {userId:userId,title:title}
            var updateTags = {$inc:{count:+1}}
            Tags.update(whereTags, updateTags,(err,ret)=>{

            })
        }
    })
}
module.exports={
    updateTags
}