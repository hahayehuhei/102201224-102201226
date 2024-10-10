const mongoose = require('mongoose');
const Project = require('./models/Project');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/project_manager')
    .then(async () => {
        console.log('已连接到 MongoDB');

        // 创建六个自带项目
        const projects = [
            {
                name: '高等数学研究',
                image: './images/project1.jpg',
                description: '对高等数学的深入研究，包括理论与应用。',
                type: '学生自主研究',
                isDefault: true
            },
            {
                name: '福大建筑美学',
                image: './images/project2.jpg',
                description: '探索福州大学建筑的美学价值和设计理念。',
                type: '教师指导学生研究',
                isDefault: true
            },
            {
                name: '风景园林规划实训',
                image: './images/project3.jpg',
                description: '关于风景园林规划与实训的研究。',
                type: '教师指导学生研究',
                isDefault: true
            },
            {
                name: '孙子兵法实操',
                image: './images/project4.jpg',
                description: '《孙子兵法》理论在实际中的应用与探索。',
                type: '学生自主研究',
                isDefault: true
            },
            {
                name: '嵌入式系统原理研究',
                image: './images/project5.jpg',
                description: '嵌入式系统的基础原理及应用。',
                type: '教师指导学生研究',
                isDefault: true
            },
            {
                name: '企鹅生活习性观察',
                image: './images/project6.jpg',
                description: '对企鹅生活习性及生态的深入观察与研究。',
                type: '学生自主研究',
                isDefault: true
            }
        ];

        // 清除已有的自带项目（可选）
        await Project.deleteMany({ isDefault: true });

        // 保存所有项目到数据库
        for (const projectData of projects) {
            const project = new Project(projectData);
            await project.save();
        }

        console.log('自带项目已添加');
    })
    .catch(err => console.error('连接失败或保存项目时出错:', err))
    .finally(() => mongoose.connection.close());
