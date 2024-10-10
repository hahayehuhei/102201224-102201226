const mongoose = require('mongoose');

// 定义用户模式
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    major: { type: String }, // 专业
    bio: { type: String }, // 个人简介
    avatar: { type: String }, // 头像URL
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] // 关联已加入的项目
});

// 导出用户模型
module.exports = mongoose.model('User', userSchema);
