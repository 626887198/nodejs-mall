let service = require("../server/category");
let router = require("express").Router();

//增加分类
router.post("/",async (req,res)=>{
   let category = await service.addCategory(req.body);
   res.success(category)
})

//分页查询分类
router.get("/",async (req,res)=>{
    let categorys = await service.getCategoryByPage(req.query.page);
    res.success(categorys)
})

//更新分类
router.put("/:id",async (req,res)=>{
    await service.updateCategory(req.params.id,req.body);
    res.success()
})

//删除分类
router.delete("/:id",async (req,res)=>{
    await service.deleteCategory(req.params.id);
    res.success()
})
module.exports=router;
