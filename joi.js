// 引入jio模块
const Joi = require('joi');
// 定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birthday: Joi.number().min(1900).max(20200).error(new Error('birthday属性没有通过验证'))
};

async function run() {
    // 实施验证
    try {
        await Joi.validate({
            username: 'ab',
            birthday: 1900
        }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }

    console.log('验证通过');
    
}

run();