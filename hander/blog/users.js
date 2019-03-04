// var express = require("express");
// var router = express.Router();

var Users = require("../../model/blog/userModel")
// var collection = require("../../model/blog/collectionModel")
/* GET users listing. */
function register(req, res, next) {
  var params = req.body;
  var date = new Date().toDateString()
  console.log(date)
  // var userInfo = {
  //   nickName: params.nickName,
  //   account: params.account,
  //   passWord: params.passWord,
  //   registerTime:date,
  //   signature:" "
  // };
  var user = new Users({
    nickName: params.nickName,
    account: params.account,
    passWord: params.passWord,
    registerTime:date,
    signature:" "
  })
  // console.log(userInfo)
  user.save((err,result)=>{
    if(err){
      res.send({
        data:null,
        status: 200,
        err: "注册失败"
      })
    }else{
      console.log("userInfo")
      // var newCollections =[
      //   {
      //     userId:userInfo._id,
      //     title:"随笔"
      //   },
      //   {
      //     userId:userInfo._id,
      //     title:"日记本"
      //   }
      // ] 
      res.send({
        data:result,
        status: 200,
        err: null
      })
    }

  })
}
function login(req, res, next) {
  var params = req.body;
  var account = params.account;
  var passWord = params.passWord;
  users.find({ account: account },(err,result)=>{
    if(err){
      res.json({
        data: null,
        status: 500,
        err: err
      });
    }else if (result.length > 0) {
      var user = result[0]
      console.log(user)
      if (user.passWord === passWord) {
        res.cookie("userId", user._id.toHexString(), {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", user.nickName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("account", user.account, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          data: {
            account: result[0].account,
            nickName: result[0].nickName,
            userId: result[0]._id.toHexString()
          },
          status: 200,
          err: null
        });
      } else {
        res.json({
          data: null,
          status: 200,
          err: "密码错误"
        });
      }
    } else {
      res.json({
        data: null,
        status: 200,
        err: "账户不存在"
      });
    }
  })
};
function logout(req, res, next) {
  res.clearCookie('userId', { path: '/' });
  res.clearCookie('userName', { path: '/' });
  res.clearCookie('account', { path: '/' });
  res.send({
    data: "退出成功",
    status: 200,
    err: null
  })
}
module.exports = {
  register,
  login,
  logout
};
