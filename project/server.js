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
mongoose.connect('mongodb://localhost:27017/project_manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('已连接到 MongoDB'))
.catch(err => console.error('MongoDB 连接失败:', err));

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

// 重置密码
app.post('/api/reset-password', async (req, res) => {
    const { username, studentId, email, newPassword } = req.body;
    const user = await User.findOne({ username, studentId, email });
    if (user) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.send('密码已重置');
    } else {
        res.status(404).send('用户未找到');
    }
});

// 监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT} 运行`);
});
