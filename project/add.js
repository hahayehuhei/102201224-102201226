const mongoose = require('mongoose');
const Project = require('./models/Project');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/project_manager')
    .then(async () => {
        console.log('已连接到 MongoDB');

        // 创建两个自带项目
        const project1 = new Project({
            name: '高等数学研究',
            image: './images/project1.jpg',
            description: '对高等数学的深入研究，包括理论与应用。',
            type: '学生自主研究',
            isDefault: true // 标记为自带项目
        });

        const project2 = new Project({
            name: '福大建筑美学',
            image: './images/project2.jpg',
            description: '探索福州大学建筑的美学价值和设计理念。',
            type: '教师指导学生研究',
            isDefault: true // 标记为自带项目
        });

        // 保存项目到数据库
        await project1.save();
        await project2.save();

        console.log('自带项目已添加');
    })
    .catch(err => console.error('连接失败或保存项目时出错:', err))
    .finally(() => mongoose.connection.close());
