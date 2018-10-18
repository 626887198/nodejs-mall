require("express-async-errors");
require("./db");
let express = require('express');
let logger = require('morgan');
let app = express();
let config = require("./config");

// 使用自定义的加强response的中间件
app.use(require("./mid/res_md"))
//使用日志
app.use(logger('combined'))
//解析json格式数据
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//加载自定义路由
app.use("/user",require("./router/user"))

//全局错误中间件，放在加载路由后面
app.use((err, req, res, next)=> {
    res.fail(err)
});




app.listen(config.port);
