var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  var params = req.body
  var userInfo = {
      nickName:params.nickName,
      account:params.account,
      passWord:params.passWord
    }
  global.mongodb
    .collection("users").insertOne(userInfo,(result)=>{
      // console.log(result)
       res.send({
         data:userInfo,
         result:result,
         status:200,
         err:null
       });
    })
 
});

module.exports = router;
