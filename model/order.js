let mongoose=require("mongoose");
let schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "商品id不能为空"]
    },
    productName:{
        type: String,
        required:[true, "商品名字不能缺少"]
    },
    productPrice: {
        type: String,
        required: [true, "商品价格不能缺少"]
    },
    count: {
        type: Number,
        required: [true, "商品数量不能为空"],
        min:[1, "商品数量不能小于1"]
    },
    total:{
        type: String
    },
    status: {
        type: String, // 订单状态: unpay success cancel
        default:"unpay"
    },
    created: {
        type:Date,
        default: Date.now(),
    },
    payTime: {
        type: Date
    },
    cancelTime: Date
}) ;
 module.exports=mongoose.model("order",schema);