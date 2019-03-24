var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var blogRouter = require("./routes/blog");
var app = express();

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
    } else if (
        req.path == '/blog/api/users/login' || 
        req.path == '/blog/api/users/register' || 
      req.path == '/blog/api/article/getArticle'||
        req.path == '/blog/api/article/getHotArticle'||
        req.path == '/blog/api/article/getArticleBytags'||
        req.path == '/blog/api/article/articleFuzzyQuery'||
        req.path == '/blog/api/tags/getTags'
    ) {
        next();
    } else {
        res.json({
            status: '200',
            data:null,
            path: req.path,
            err: 'offLine',
        })
    }
})
app.use("/blog/api/",blogRouter)

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
