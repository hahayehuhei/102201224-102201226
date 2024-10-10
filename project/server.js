const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const projectRoutes = require('./routes/projectRoutes'); // 确保路径正确
const User = require('./models/User'); // 引入用户模型

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/project_manager')
    .then(() => console.log('已连接到 MongoDB'))
    .catch(err => console.error('MongoDB 连接失败:', err));

// JWT 验证中间件
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(403); // 如果没有token

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.id; // 解码成功后，将用户ID存入req
        next();
    });
};

// 使用项目路由
app.use('/api', projectRoutes); // 确保这里的路径是正确的

// 注册
app.post('/api/register', async (req, res) => {
    const { username, studentId, password, email } = req.body;

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('用户名已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, studentId, password: hashedPassword, email });
    await newUser.save();
    res.status(201).send('用户注册成功');
});

// 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).send('用户名或密码错误');
    }
});

// 更新用户资料
app.put('/api/update-profile', authenticateToken, async (req, res) => {
    const { username, email, major, bio, avatar } = req.body;
    const userId = req.userId; // 通过JWT中间件获取的用户ID

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('用户未找到');

        // 更新用户信息
        user.username = username;
        user.email = email;
        user.major = major;
        user.bio = bio;
        user.avatar = avatar;
        await user.save();

        res.send('资料更新成功');
    } catch (err) {
        res.status(500).send('更新资料失败');
    }
});

// 获取用户资料
app.get('/api/profile', authenticateToken, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: '用户未找到' });

        res.json({
            username: user.username,
            email: user.email,
            major: user.major,
            bio: user.bio,
            avatar: user.avatar
        });
    } catch (err) {
        res.status(500).json({ message: '获取用户资料失败' });
    }
});

// 监听端口
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT} 运行`);
});

// 导出 app 实例以供测试使用
module.exports = app; // 确保导出的是 app 实例
