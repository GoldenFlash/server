var express = require("express");
var router = express.Router();
var images = require("../hander/doutu/images")

router.post("/images/saveImage", images.saveImage)
router.get("/images/getList", images.getList)
module.exports = router;
