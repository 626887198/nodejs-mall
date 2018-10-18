let Category = require("../model/category");
let config = require("../config");

//查询分类
async function getCategoryByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_MAX;
    let categorys = await Category.find().limit(config.PAGE_MAX).skip(offset)
    return categorys
}

//增加分类
async function addCategory(category) {
    category.created=Date.now()
    category = await Category.create(category);
    return category;
}

//更新分类
async  function updateCategory(id, category) {
    let result = await Category.updateOne({_id:id},category);
    if(result.n!==1){
        throw Error(`更新ID为${id}的分类失败`)
    }
}

//删除分类
async function deleteCategory(id) {
    let result = await Category.deleteOne({_id:id});
    if (result.n!==1){
        throw Error(`删除ID为${id}的分类失败`)
    }
}

//暴露方法
module.exports={
    addCategory,
    getCategoryByPage,
    updateCategory,
    deleteCategory
}