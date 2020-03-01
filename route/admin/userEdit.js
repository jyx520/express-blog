const { User } = require('../../model/user');

module.exports = async (req, res) => {

    // 标识 表示当前页面访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // console.log(req.query);
    const { message, id} = req.query;
    // 如果传递了id参数 说明是修改操作
    if(id) {
        let user = await User.findOne({_id: id});
        // res.send(user);
        // return;
        // 渲染用户编辑页面(修改)
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id='+ id,
            button: '修改',
            id:id
        });
    } else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
}