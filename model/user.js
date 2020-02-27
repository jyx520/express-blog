const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Joi = require('joi');

// 创建用户集合规则
userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },

    email: {
        type: String,
        required: true,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    // 超级管理员 admin
    //  普通用户 normal
    role: {
        type: String,
        required: true,
    },

    // 0 禁用状态
    // 1 启用状态
    state: {
        type: Number,
        default: 1,
    },
});
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', userSchema);

// 测试代码
async function createUser() {
    // 先生成盐
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('1234567890', salt);
    const user = await User.create({
        username: '小明',
        email: 'xiaoming@sina.com.cn',
        password: pass,
        role: 'normal',
        state: 1,
    });
}

// 验证用户信息
const validateUser = function(user) {
        // 定义对象的验证规则
        const schema = {
            username: Joi.string().min(2).max(12).required().error(new Error('输入的用户名格式不正确')),
            email: Joi.string().email().required().error(new Error('邮箱格式不正确')),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,20}$/).required().error(new Error('密码格式不正确')),
            role: Joi.string().valid('admin', 'normal').required().error(new Error('角色值非法')),
            state: Joi.number().valid(0, 1).integer().required().error(new Error('状态值非法')),
        };
          // 实施验证
        return Joi.validate(user, schema);
}
// createUser();


module.exports = {
    // User: User, // es6中键值相同可以把值省略不写
    User,
    validateUser
}