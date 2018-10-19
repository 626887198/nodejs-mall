let crypto = require("../cryptoUtil/cryptoUtil");
let config = require("../config");
let userService =require("../server/user")

function checkUrl(url) {
    //不需要登录
    //1注册: /user/regist
    // 2登录: /user/login
    // console.log(url)  // /order?page=2

    let ignoreUrls = [
        //正则表达式
        /\/user\/regist/,
        /\/user\/login/
    ];
    let isNeedCheck = true; //标记位，是否需要进行校验
    //js中forEach()是不可以使用break中断的
    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            isNeedCheck = false;  //不需要进行校验
            break;
        }
    }
    return isNeedCheck;

}

//检验用户是否已经登录
module.exports =async (req, res, next) => {
    //用户请求的路径
    let url = req.url;
    if (checkUrl(url)) {
        //获取token
        let crypto_token = req.get("token")
        if (!crypto_token) {
            throw Error("请求头中没有token数据，请登录")
        }
        //解密token
        let tokenJson=null
        try {
            tokenJson = crypto.aesDecrypt(crypto_token, config.TOKEN_KEY);
        } catch (e) {
            throw Error("token无效，请登录")
        }
        let token = JSON.parse(tokenJson);
        if (token.expire < Date.now()) {
            throw Error("token已过期，请登录")
        }
         //取出token中的username，查询是否正确
        let username=token.username;
        let user =await userService.findByUsername(username)
        if (!user){
            throw Error("token无效，请登录")
        }
        // 把查询到的user存储到req对象
        req.user=user;
    }

    //放行
    next();
};