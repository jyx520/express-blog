const { User } = require('../../model/user');
// 引入bcrypt模块处理密码
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    // 接收客户端的请求参数
    // console.log(req.body);
    // res.end('ok');
    // 解构值
    let { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    // if(email.trim().length == 0 || password.trim().length == 0) return res.status(404).send('<h4>邮箱号码或者密码错误</h4>');
    if(email.trim().length == 0 || password.trim().length == 0) return res.status(404).render('admin/error', {
        msg: '邮箱号码或者密码错误'
    });
    // 根据邮箱地址查询用户信息
	// 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
	// 如果没有查询到用户 user变量为空
    let user = await User.findOne({ email });
    // console.log(user);
    if(user) { 
        // 将客户端传递过来的密码和用户信息中的密码进行比对
		// true 比对成功
        // false 对比失败
        let isValid = await bcrypt.compare(password, user.password);
        // 如果密码比对成功
        if(isValid) {
            // 将用户名存储在请求对象中
            req.session.username = user.username;

            req.app.locals.userInfo = user;
            // 重定向到用户列表页面
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', {
                msg: '邮箱号码或者密码错误'
            });
        }

    } else {
        res.status(400).render('admin/error', {
            msg: '邮箱号码或者密码错误'
        });
    }
};
