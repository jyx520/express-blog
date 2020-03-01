// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题'],
        minlength: 4,
        maxlength: 20
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请输入作者名字'],
    },

    publishDate: {
        type: Date,
        default: Date.now,
    },

    cover: {
        type: String,
        default: null,
    },

    content: {
        type:String,
    }
});


// 根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 将集合规则作为模块成员导出
module.exports = {
    Article,
}