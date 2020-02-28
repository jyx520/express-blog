// 引用express框架
const express = require('express');

// 引入path系统模块
const path = require('path');

// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');

// 引入express-session模块
const session = require('express-session');

// 创建网站服务器
const app = express();

// 数据库连接
require('./model/connect');

// 处理post请求参数
app.use(bodyParser.urlencoded({extended: false}));

// require('./model/user');

// 配置session
app.use(session({
        secret: 'leDhhUU/u3HYQHDdH8JBblN0Jyhu4Fy9IMXEiilM8yDxLVETJkN7+WWZi+gSTIvN',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60*1000,
            httpOnly: true,
        }
    }));


// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 告诉express框架 模板所在的位置
app.set('views', path.join(__dirname, 'views'));

// 告诉express框架 模板的的默认后缀是什么
app.set('view engine', 'art');

// 当渲染后缀为art的模板时, 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

// 引入路由模块
const home = require('./route/home');

const admin = require('./route/admin');

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    // { path: '/admin/user-edit', message:'密码比对失败, 不能对用户信息的修改', id:id}
    params = [];
    for(let attr in result) {
        if(attr != 'path') {
            params.push(attr + "=" + result[attr]);
        }
    }
    res.redirect(`${ result.path }?${ params.join('&') }`);
});

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功, 请访问http://localhost:3000');