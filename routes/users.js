var express = require("express");
var router = express.Router();
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
router.post("/register", function(req, res, next) {
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
                { userId: userInfo._id, title: "日记本" },
                { userId: userInfo._id, title: "随笔" }
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
});
router.post("/login", function(req, res, next) {
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
            console.log(res.cookie);
            // res.cookie("userId", "user.userId");
            res.cookie("isVisit", 1, { maxAge: 60 * 1000, httpOnly: true });
            // res.cookie("userName", "user.userName", {
            //     path: '/',
            //     maxAge: 1000 * 60 * 60
            // });
            res.json({
              data: {
                account: result[0].account,
                nickName: result[0].nickName,
                userId: result[0]._id
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
});
module.exports = router;
