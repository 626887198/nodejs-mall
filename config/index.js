// 读取环境变量中NODE_ENV的值
let nodeenv = process.env.NODE_ENV;

let config=null;
if (nodeenv==="prod"){
    config=require("./prod")
}else {
    config=require("./dev")

}

module.exports=config;