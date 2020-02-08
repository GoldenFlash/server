var http = require("https");

getData = () => {
  return new Promise((resolve, reject) => {
    var url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
    http.get(url, function(data) {
      var str = "";
      data.on("data", function(chunk) {
        str += chunk; //监听数据响应，拼接数据片段
      });
      data.on("end", function() {
        resolve(str);
      });
    });
  });
};
async function getnCovInfo(req, res, next) {
  try {
    let data = await getData();
    data = JSON.parse(JSON.parse(data).data)
    res.send({
      status: 200,
      data:data,
      error: null,
      message: "查询成功"
    });
  } catch (error) {
    res.send({
      status: 200,
      data: null,
      error: error,
      message: "查询失败"
    });
  }
}

module.exports = {
  getnCovInfo
};
