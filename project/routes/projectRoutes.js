const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// 获取所有项目
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
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
        type
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 删除项目
router.delete('/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        console.log(`尝试删除项目 ID: ${projectId}`); // 输出尝试删除的项目 ID

        const result = await Project.findByIdAndDelete(projectId);

        if (!result) {
            console.error('未找到项目，无法删除');
            return res.status(404).json({ message: '项目未找到' });
        }

        res.json({ message: '项目已删除' });
    } catch (err) {
        console.error('删除项目出错:', err); // 输出详细的错误信息
        res.status(500).json({ message: '服务器错误，无法删除项目' });
    }
});



// 获取单个项目
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
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

module.exports = router;
