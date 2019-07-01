// var mongoose = require("mongoose");

let imagesModel = require("../../model/doutu/imagesModel")

function saveImage(req, res, next){
    let title = req.body.title
    let imageUrl = req.body.imageUrl
    let content = req.body.content
    let image = new imagesModel({
        title:title,
        imageUrl: imageUrl,
        content: content
    })
    image.save((err, ret) => {
            if (err) {
                res.send({
                    status: 200,
                    data: ret,
                    err: err,
                    message: "保存失败"
                });
            }
            res.send({
                status: 200,
                data: ret,
                err: err,
                message: "保存成功"
            });
        })

}
function getList(req,res,next){
    imagesModel.find({}).sort({ 'creatTime': -1 }).exec(function (err, ret) {
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
    saveImage,
    getList
}