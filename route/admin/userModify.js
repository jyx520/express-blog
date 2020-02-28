const { User } = require('../../model/user');

const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    // res.send('ok');
    // 接收客户端传递过来的请求参数
    const body = req.body;
    //即将要修改的用户id
    const id = req.query.id;

    let user = await User.findOne({_id: id});
    // res.send(user);
    // 密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(isValid) {
        res.send('密码比对成功');
    } else {
        // 密码比对失败
        // res.send('密码比对失败');
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: '密码比对失败, 不能对用户信息的修改',
            id: id
        }));
    }



    // res.send(body.password);
}