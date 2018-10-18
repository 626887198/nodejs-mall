let Product = require("../model/product");
let config = require("../config");

//查询产品
async function getProductByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_MAX;
    let product = await Product.find().limit(config.PAGE_MAX).skip(offset)
    return product
}
//查询单个
async function getProductById(id) {
   return await Product.findOne({_id:id})
}

//增加产品
async function addProduct(product) {
    product.created=Date.now()
    product = await Product.create(product);

    return product;
}

//更新产品
async  function updateProduct(id, product) {
    let result = await Product.updateOne({_id:id},product);
    if(result.n!==1){
        throw Error(`更新ID为${id}的产品失败`)
    }
}

//删除产品
async function deleteProduct(id) {
    let result = await Product.deleteOne({_id:id});
    if (result.n!==1){
        throw Error(`删除ID为${id}的产品失败`)
    }
}

module.exports={
    addProduct,
    getProductById,
    getProductByPage,
    deleteProduct,
    updateProduct
}


