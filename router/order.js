let Order = require("../server/order");
let router = require("express").Router();

//分页获取订单
//url:localhost/order?page=1
router.get("/", async (req,res)=>{
   let result = await Order.findByPage(req.query.page);
   res.success(result);
})

//添加订单 
router.post("/",async (req,res)=>{
    let result = await Order.addItem(req.body);
    res.success(result);
})

module.exports=router;