
const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {


    try {
         // 实施验证
        await validateUser(req.body);
    } catch (ex) {
        // 验证没有通过
        // 重定向回用户添加页面
        // res.redirect('/admin/user-edit?message' + ex.mwssage);
        // res.redirect(`/admin/user-edit?message=${ex.message}`);
        // return;
        // JSON.stringify() // 将对象数据类型转换为字符串数据类型
        // {
        //     path: '跳转地址',
        //     message: '错误信息'
        // }
        return next(JSON.stringify(
            {   
                path: '/admin/user-edit',
                message: ex.message
            }
            ));  // next()里面的参数必须是字符串 {} => "{}"
        //ex.message
    }

    // 根据邮箱地址查询用户是否已经存在
    let user = await User.findOne({email: req.body.email});
    // res.send(user);

    // 如果用户已经存在 邮箱地址已经被别人占用
    if(user) {
        // res.redirect('/admin/user-edit?message=邮箱号码已经被占用, 请重新输入');
        // return;
        return next(JSON.stringify(
            {
                path: '/admin/user-edit',
                message: '邮箱号码已经被占用, 请重新输入'
            }
            ));
    }
    // res.send(req.body);

    // 对密码进行加密处理
    // 生成盐(即随机字符串)
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // 替换密码
    req.body.password = password;
    // res.send(password);

    await User.create(req.body);
    res.redirect('/admin/user');
    
}