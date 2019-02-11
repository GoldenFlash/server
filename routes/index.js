var express = require("express");
var router = express.Router();
/* GET home page. */
router.post("/articleList", function(req, res, next) {
  console.log(req.body);
  var param = req.body;
  global.mongodb
    .collection("users")
    .find({ id: param.id })
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
      .collection("collections")
      .find({ id: param.id })
      .toArray((err, result) => {
        if (err) {
          throw err;
        } else {
          console.log(result[0].articleCollections);
          var findResult = [];
          var findResult = result[0].articleCollections
            ? result[0].articleCollections
            : [];
        }
        var include = findResult.some(item => {
          return item.title === param.title;
        });
        if (!include) {
          findResult.push({
            title: param.title
          });
          global.mongodb
            .collection("users")
            .updateOne(
              { id: param.id },
              { $set: { articleCollections: findResult } },
              (err, result) => {
                if (err) {
                  res.send({
                    status: 200,
                    data: findResult,
                    err: err
                  });
                } else {
                  res.send({
                    status: 200,
                    result: result,
                    data: findResult,
                    err: null
                  });
                }
              }
            );
        } else {
          res.send({
            status: 200,
            data: null,
            err: "文集已存在"
          });
        }
      });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "参数不全"
    });
  }
});
router.post("/getCollections", function(req, res, next) {
  var param = req.body;
  console.log("param", param);
  if (param.id) {
    global.mongodb
      .collection("users")
      .find({ id: param.id })
      .toArray((err, result) => {
        if (err) {
          res.send({
            status: 200,
            data: null,
            err: err
          });
        } else if (result[0]) {
          console.log(result[0].articleCollections);
          var findResult = [];
          var findResult = result[0].articleCollections
            ? result[0].articleCollections
            : [];

          res.send({
            status: 200,
            result:result[0],
            data: findResult,
            err: null
          });
        } else {
          res.send({
            status: 200,
            data: null,
            err: "id不存在"
          });
        }
      });
  } else {
    res.send({
      status: 200,
      data: null,
      err: "参数不全"
    });
  }
});
router.post("/deleteCollections", function(req, res, next) {
  var param = req.body;
  if (param.id && param.title) {
    global.mongodb
      .collection("users")
      .find({ id: param.id })
      .toArray((err, result) => {
        if (err) {
          res.send({
            status: 200,
            data: null,
            err: err
          });
        } else {
          if (result[0]) {
            console.log(result[0].articleCollections);
            var findResult = [];
            var findResult = result[0].articleCollections;
            var collection = findResult.filter(item => {
              return item.title !== param.title;
            });
            global.mongodb
              .collection("users")
              .updateOne(
                { id: param.id },
                { $set: { articleCollections: collection } },
                (err, result) => {
                  if (err) {
                    res.send({
                      status: 200,
                      data: collection,
                      err: err
                    });
                  } else {
                    res.send({
                      status: 200,
                      // result: result,
                      data: collection,
                      err: null
                    });
                  }
                }
              );
          }
        }
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
