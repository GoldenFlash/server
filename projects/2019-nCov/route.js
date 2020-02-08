var express = require("express");
var handel =require("./handel")
var router = express.Router();

router.get("/getnCovInfo",handel.getnCovInfo)

module.exports = router