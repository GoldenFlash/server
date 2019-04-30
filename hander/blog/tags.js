var mongoose = require("mongoose");
var Article = require("../../model/blog/articleModel")
var Tags = require("../../model/blog/tagsModel")
function updateTags(req,res,next){

    var userId = req.cookies.userId;
    var collectionId = req.body.collectionId;
    var id = mongoose.Types.ObjectId(`${req.body.id}`);
    var title = req.body.title
    var type = req.body.type
    var whereStr = { userId: userId, collectionId: collectionId, _id: id };  // 查询条件
    var updateStr =""
    var updateTags = ""
    if(type==="add"){
        updateStr = { $set: { "updateTime": Date.now() }, $push: { "tags": title } };
        updateTags = {$inc:{count:+1}}
    }
    if(type==="delete"){
        console.log("type",type)
        updateStr = { $set: { "updateTime": Date.now() }, $pull: { "tags": title } };
        updateTags = {$inc:{count:-1}}
    }

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
            Tags.findOneAndUpdate(whereTags, updateTags,(err,ret)=>{
                console.log("tags",ret)
                if(type==="delete"&&ret.count<=1){
                    Tags.deleteOne(whereTags,(err)=>{
                        console.log(err)
                    })
                }
            })
        }
    })
}

function getTags(req,res,next){
    Tags.find((err,ret)=>{
        if(err){
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
module.exports={
    updateTags,
    getTags
}