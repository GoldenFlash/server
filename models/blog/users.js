// var express = require("express");
// var router = express.Router();
var getAllUsers = function(userInfo) {
  return new Promise((resolve, reject) => {
    global.mongodb
      .collection("users")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        var repeat = result.some(item => {
          if (item.account === userInfo.account) {
            return true;
          }
        });
        resolve(repeat);
      });
  });
};
/* GET users listing. */
function register (req, res, next) {
  var params = req.body;
  var userInfo = {
    nickName: params.nickName,
    account: params.account,
    passWord: params.passWord
  };
  getAllUsers(userInfo)
    .then(repeat => {
      if (repeat) {
        res.send({
          data: userInfo,
          // result: result,
          status: 200,
          err: "注册失败(邮箱已被使用)"
        });
      } else {
        global.mongodb
          .collection("users")
          .insertOne(userInfo, (err, result) => {
            if (err) {
              res.send({
                data: userInfo,
                result: result,
                status: 200,
                err: "注册失败"
              });
            } else {
              console.log("userInfo", userInfo);
              var collections = [
                { userId: userInfo._id.toHexString(), title: "日记本" },
                { userId: userInfo._id.toHexString(), title: "随笔" }
              ];
              global.mongodb
                .collection("collections")
                .insertMany(collections, (err, result) => {
                  res.send({
                    data: userInfo,
                    result: result,
                    status: 200,
                    err: null
                  });
                });
            }
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
function login(req, res, next) {
  var params = req.body;
  var account = params.account;
  var passWord = params.passWord;

  global.mongodb
    .collection("users")
    .find({ account: account })
    .toArray(function(err, result) {
      if (err) {
        res.send({
          data: null,
          status: 200,
          err: "登录失败请重试"
        });
      } else {
        var user = result[0];
        if (user) {
          if (user.passWord === passWord) {
            // console.log(req.cookie);
            // res.cookie("userId", "user.userId");
            console.log(user)
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
      }
    });
};
function logout(req,res,next){
  res.clearCookie('userId', { path: '/' });
  res.clearCookie('userName', { path: '/' });
  res.clearCookie('account', { path: '/' });
  res.send({
    data:"退出成功",
    status:200,
    err:null
  })
}
module.exports = {
  register,
  login,
  logout
};
