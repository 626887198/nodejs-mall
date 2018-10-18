let router = require("express").Router();
let service = require("../server/product");

//增加产品
router.post("/",async (req,res)=>{
    let product = await service.addProduct(req.body);
    res.success(product)
})

//分页查询产品
router.get("/",async (req,res)=>{
    let product = await service.getProductByPage(req.query.page);
    res.success(product)
})

//更新产品
router.put("/:id",async (req,res)=>{
    await service.updateProduct(req.params.id,req.body);
    res.success()
})

//删除分类
router.delete("/:id",async (req,res)=>{
    await service.deleteProduct(req.params.id);
    res.success()
})
module.exports=router;
