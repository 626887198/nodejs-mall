let User = require("../model/user")
let crypto = require("../cryptoUtil/cryptoUtil")
let config = require("../config")

/**
 * 用户注册
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function regist(user) {
    //先根据用户名查找用户
    let result = await User.findOne({username:user.username});
    if (result) {
        throw Error(`用户名${user.username}已经存在`)
    }

    //对密码加密加盐
    user.password = crypto.md5Hmac(user.password, user.username);
    //校准权限
    user.role = 0;
    result = await User.create(user);
    result.password = "";
    return result;
}

/**
 * 根据用户名查找用户
 * @param username
 * @returns {Promise<*>}
 */
async function findByUsername(username) {
    let user=await User.findOne({username: username})
    if (!user) {
        throw Error(`用户名为${username}的用户不存在`)
    }
    user.password = "";
    return user
}

async function deleteUserByUsername(username) {
    //先查出是否有该用户
    await findByUsername(username)
    let result = await  User.deleteOne({username: username});
    if (!result.n === 1) {
        throw Error(`删除失败`)
    }
}

async function login(user) {
    // 根据用户名检查用户是否存在
    // await isExistByUsername(user.username);
    // 用户有没有传递密码过来
    let password = user.password;
    if (password === null) {
        throw Error("密码不能为空")
    }
    user.password = crypto.md5Hmac(user.password, user.username);
    user = await User.findOne(user)
    if (!user) {
        throw Error("账户名或密码不正确")
    }
    user.password = '';

    // 定义token
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };
    //加密token
    // 参数1 : 原文
    // 参数2 : 密钥
    let crypto_token = crypto.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    return crypto_token
}

module.exports = {
    regist,
    login,
    findByUsername,
    deleteUserByUsername
}
