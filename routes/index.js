var express = require("express");
var router = express.Router();
/* GET home page. */
router.post("/articleList", function(req, res, next) {
  console.log(req.body);
   var param = req.body;
  global.mongodb
    .collection("users")
    .find({ "id": param.id })
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});
router.post("/addCollections", function(req, res, next) {
  //   db.col.update({ title: "MongoDB 教程" }, { $set: { title: "MongoDB" } });
  var param = req.body;
  if (param.id && param.title) {
    global.mongodb
      .collection("users")
      .find({ "id": param.id })
      .toArray((err, result) => {
        if (err) {
          throw err;
        } else {
            console.log(result[0].articleCollections)
            var findResult = []
          var findResult =result[0].articleCollections
            ? result[0].articleCollections
            : [];
            
        }
        findResult.push({
          "title": param.title
        });
        // res.send({
        //   status: 200,
        //   data: findResult,
        //   err: null
        // });
        global.mongodb
          .collection("users")
          .updateOne(
            { "id": param.id },
            { $set: { "articleCollections": findResult } },
            (err, result) => {
                if(err){
                    res.send({
                        status: 200,
                        result:result,
                        data: findResult,
                        err: err
                    });
                }else{
                    res.send({
                        status: 200,
                        result:result,
                        data: findResult,
                        err: null
                    });
                }
              
            }
          );
      });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "参数不全"
    });
  }
});

module.exports = router;
