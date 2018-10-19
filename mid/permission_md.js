let permissions=[
    {
        role:0, //普通商家
        urls:[
          /category.*/ ,
          /order.*/ ,
          /product.*/
        ]
    },
    {
        role:100,  //管理员
        urls:[/.*/]
    }
]

module.exports=(req,res,next)=>{
    //取出在token中间件中存入request的user
    let user =req.user;
    //请求的url
    let url = req.url;
    //定义一个标记位，表示该用户权限是否可以访问该地址
    let isGo =false;
    if(user){
        let role = user.role;
       outer:for (let i=0;i<permissions.length;i++){
           let permission=permissions[i];
           if(permission.role===role){
               let urls = permission.urls;
               for(let j=0;j<urls.length;j++){
                 if (urls[j].test(url)){
                     isGo=true; //匹配成功，说明有对应权限，修改标记位
                     break outer;
                 }
               }
           }
       }
        // 整个循环结束以后,如果发现用户没有权限访问对应的url地址,就抛出异常
        if(!isGo){
           throw Error("您没有该地址的访问权限")
        }
    }
    //放行
    next();
};