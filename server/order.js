let big = require("big.js");
let Order = require("../model/order");
let config=require("../config");
let productService = require("./product");

//生成订单
//{prid:001,count:10}
async function addItem(order) {
    //逻辑
    //根据商品id，查询商品(库存，价格,商品名)
    //检查库存是否足够
    //计算总金额
    //扣减库存，付款时间
  let product = await productService.getProductById(order.productId);
  if(!product){
      throw Error(`ID为${order.productId}的商品不存在`)
  }
  //重新赋值
  order.productName=product.name;
  order.productPrice=product.price;
  if(order.count>product.stock){
      throw Error(`商品库存不足，请修改购买数量`)
  }

  //计算总金额
    let price = product.price;
    let total= big(price).times(order.count);
    order.total=total;

    //生成订单
    let result = await Order.create(order);

    //更新商品库存,操作的是product表
    await productService.updateProduct(order.productId,{stock:product.stock-order.count});
    
    return result;

    
}

//订单分页查询
async  function findByPage(page=1) {
        let offset = (page - 1) * config.PAGE_MAX;
        let orders = await Order.find().limit(config.PAGE_MAX).skip(offset)
        return orders
}
//数据库中的数据是不允许删除

module.exports={
    findByPage,
    addItem
}