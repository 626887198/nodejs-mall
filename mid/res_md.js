module.exports=(req,res,next)=>{
    res.success=(data=null)=>{
       res.send({
           code:1,
           msg:"操作成功",
           data:data
       })
    } ;

    res.fail=(err)=>{
        res.send({
            code:-1,
            msg:"操作失败",
            data:err.toString()
        })
    } ;

    //放行
    next();
};