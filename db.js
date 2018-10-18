let mongoose = require("mongoose");
let config=require("./config") ;
mongoose.connect("mongodb://localhost/"+config.db,{useNewUrlParser: true});
let connection= mongoose.connection ;
connection.on("error",(err)=>{
     console.log("数据库连接失败"+err.toString());
})

connection.once("open",()=>{
       console.log("连接成功")
})

