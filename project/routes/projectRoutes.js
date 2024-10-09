const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');

// 获取所有自带项目
router.get('/default-projects', async (req, res) => {
    try {
        const defaultProjects = await Project.find({ isDefault: true }); // 查找所有自带项目
        res.json(defaultProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 发布新项目
router.post('/projects', async (req, res) => {
    const { name, image, description, type } = req.body;
    const project = new Project({
        name,
        image,
        description,
        type,
        isDefault: false // 用户添加的项目不是自带项目
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 获取所有项目（包括自带和用户添加的）
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 删除项目
router.delete('/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const result = await Project.findByIdAndDelete(projectId);

        if (!result) {
            return res.status(404).json({ message: '项目未找到' });
        }

        res.json({ message: '项目已删除' });
    } catch (err) {
        res.status(500).json({ message: '服务器错误，无法删除项目' });
    }
});

// 获取单个项目
router.get('/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: '项目未找到' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 更新项目
router.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: '项目未找到' });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 获取用户已加入的项目
router.get('/users/:id/projects', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('joinedProjects');
        res.json(user.joinedProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 加入项目
router.post('/users/:id/projects', async (req, res) => {
    const userId = req.params.id;
    const { projectId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: '用户未找到' });

        if (!user.joinedProjects.includes(projectId)) {
            user.joinedProjects.push(projectId);
            await user.save();
            res.status(200).json({ message: '项目已加入' });
        } else {
            res.status(400).json({ message: '已加入此项目' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// 发布新项目（用于复制自带项目）
router.post('/projects', async (req, res) => {
    const projectId = req.body.projectId; // 从请求体获取项目 ID

    try {
        const originalProject = await Project.findById(projectId);
        if (!originalProject) {
            return res.status(404).json({ message: '项目未找到' });
        }

        // 创建一个新项目，复制原始项目的属性
        const newProject = new Project({
            name: originalProject.name,
            image: originalProject.image,
            description: originalProject.description,
            type: originalProject.type,
            isDefault: false // 标记为用户添加的项目
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 导出路由
module.exports = router;
