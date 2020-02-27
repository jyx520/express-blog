
const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 总页数 = Math.ceil(总数据条数 / 每页显示的数据条数)
    // 当前页要转换为数据条数的开始位置 数据的开始位置 =  (当前页 - 1)* 每页显示的数据条数
    // 接收客户端传递过来的当前也参数
    let page = req.query.page || 1;
    // res.send(page);
    // return;

    // 每一页显示的数据条数
    let pageSize = 2;

    // 查询用户数据的总数
    let counts = await User.countDocuments({});
    // res.send('用户的总数是:' + counts);
    // return;

    let pageTotal =  Math.ceil(counts / pageSize);
    // res.send('总页数是:' + pageTotal);
    // return;

    // 页码对应的数据查询开始位置
    let start = (page - 1) * pageSize;

    // 查询用户信息
    let users = await User.find({}).limit(pageSize).skip(start);
    // res.send(users);

    

    res.render('admin/user', {
        users: users,
        page: page,
        pageTotal: pageTotal
    });
};