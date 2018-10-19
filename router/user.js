let userService = require("../server/user");
let router = require("express").Router();
let crypto = require("../cryptoUtil/cryptoUtil")

//用户注册
router.post("/regist", async (req, res) => {
    let user = await userService.regist(req.body)
    res.success(user)
});

//用户登录
router.post("/login", async (req, res) => {
    let tokendata = await  userService.login(req.body)
    res.success(tokendata)
})

//用户删除
router.delete("/:username", async (req, res) => {
    let username = req.params.username
    await userService.deleteUserByUsername(username)
    res.success()
})

//查询用户
router.get("/:username", async (req, res) => {
    let username = req.params.username
    let user = await userService.findByUsername(username)
    res.success(user)
})

module.exports=router