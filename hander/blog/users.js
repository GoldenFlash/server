// var express = require("express");
// var router = express.Router();
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

var Users = require("../../model/blog/userModel")
var Collection = require("../../model/blog/collectionModel")
/* GET users listing. */
function register(req, res, next) {
  var params = req.body;
  var user = new Users({
    nickName: params.nickName,
    account: params.account,
    passWord: params.passWord,
    signature:" "
  })
  user.save((err,ret)=>{
    if(err){
      res.send({
        status: 200,
        data: ret,
        error: err,
        message: "注册失败"
      });
    }else{
      var collections =[
        new Collection({
          userId:ret._id.toHexString(),
          nickName:ret.nickName,
          title:"随笔"
        }),
        new Collection({
          userId:ret._id.toHexString(),
          nickName:ret.nickName,
          title:"日记本"
        })
      ]
      Collection.insertMany(collections,(err,result)=>{
        if(err){

        }
      })
      res.send({
        data: ret,
        status: 200,
        error: err,
        message: ""
      });
    }

  })
}
function login(req, res, next) {
  var params = req.body;
  var account = params.account;
  var passWord = params.passWord;
  Users.findOne({ account: account },(err,ret)=>{
    if(err){
      res.json({
        status: 500,
        data: ret,
        error: err,
        message: "登录失败"
      });
    }else if (ret) {
      var user = ret
      user._id = user._id.toHexString()
      console.log(user)
      var token = jwt.sign({
        data: user
      }, 'secret', { expiresIn: 60 * 60*24 });

      if (user.passWord === passWord) {
        res.cookie("userId", user._id.toHexString(), {
          path: '/',
          maxAge: 1000 * 60 * 60*24
        });
        res.cookie("nickName", user.nickName, {
          path: '/',
          maxAge: 1000 * 60 * 60*24
        });
        res.cookie("account", user.account, {
          path: '/',
          maxAge: 1000 * 60 * 60*24
        });
        res.cookie("auth", user.auth, {
          path: '/',
          maxAge: 1000 * 60 * 60*24
        });
        res.json({
          status: 200,
          data: {
            account: user.account,
            nickName: user.nickName,
            userId: user._id.toHexString(),
            auth: user.auth,
            token: token
          },
          error: err,
          message: ""
        });
      } else {
        res.json({
          status: 200,
          data: ret,
          error: "err",
          message: "密码错误"
        });
      }
    } else {
      res.json({
        status: 200,
        data: ret,
        error: "err",
        message: "账户不存在"
      });
    }
  })
};
function logout(req, res, next) {
  res.clearCookie('userId', { path: '/' });
  res.clearCookie('nickName', { path: '/' });
  res.clearCookie('account', { path: '/' });
  res.clearCookie('auth', { path: '/' });
  res.send({
    status: 200,
    data: null,
    error: null,
    message: "退出成功"
  });
}
module.exports = {
  register,
  login,
  logout
};
