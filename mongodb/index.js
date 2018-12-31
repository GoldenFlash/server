

dbase.createCollection('site', function (err, res) {
    if (err) throw err;
    console.log("创建集合!");
    db.close();
});

dbo.collection("site").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("文档插入成功");
    db.close();
});

var myobj =  [
    { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
    { name: 'Google', url: 'https://www.google.com', type: 'en'},
    { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
   ];
dbo.collection("site").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("插入的文档数量为: " + res.insertedCount);
    db.close();
});


dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
    db.close();
});


var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });


    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });


    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });

    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });


    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });


    // 排序
    var mysort = { type: 1 };
    dbo.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });