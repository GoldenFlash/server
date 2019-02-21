var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require('mongoose');
var articleRouter = require("./routes/article");
var usersRouter = require("./routes/users");
var indexRouter = require("./routes/index");
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://101.132.173.11:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("mongodb connect success");
  var dbase = db.db("blogDatabase");
  // console.log(global)
  global.mongodb = dbase;
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  next();
});
app.all("*",function(req, res, next) {
    if (req.cookies.userId) {
        next();
    } else if (req.path == '/users/login' || req.path == '/users/logout') {
        next();
    } else {
        res.json({
            status: '200',
            data:null,
            err: 'offLine',

        })
    }
})
app.use("/index",indexRouter)
app.use("/article", articleRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
