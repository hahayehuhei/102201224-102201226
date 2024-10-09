// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes'); // 确保引入正确

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/project_manager')
    .then(() => console.log('已连接到 MongoDB 数据库'))
    .catch(err => console.log(err));

// 使用项目路由
app.use('/api', projectRoutes); // 确保路由前缀是正确的

// 监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT} 运行`);
});
