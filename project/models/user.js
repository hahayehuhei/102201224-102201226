const mongoose = require('mongoose');

// 定义用户模式
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    studentId: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] // 关联已加入的项目
});

// 导出用户模型
module.exports = mongoose.model('User', userSchema);
