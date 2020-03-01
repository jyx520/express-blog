const express = require('express');


const admin = express.Router();

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现用户退出功能
admin.get('/logout', require('./admin/logout'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/userEdit'));

// 实现用户添加功能
admin.post('/user-edit', require('./admin/userAdd'));
admin.post('/user-modify', require('./admin/userModify'));

// 删除用户功能
admin.get('/delete', require('./admin/userDeleted'));

// 文章列表页面
admin.get('/article', require('./admin/article'));

// 文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));



module.exports = admin;