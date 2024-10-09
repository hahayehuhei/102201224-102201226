const mongoose = require('mongoose');

// 定义项目模式
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['学生自主研究', '教师指导学生研究'], // 限定项目类型
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 导出项目模型
module.exports = mongoose.model('Project', projectSchema);
