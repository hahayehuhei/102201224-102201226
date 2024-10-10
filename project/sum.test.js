// sum.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // 确保路径正确，指向你的 server.js 文件
const User = require('./models/User'); // 引入用户模型
const Project = require('./models/Project'); // 引入项目模型

// 在测试开始前连接到 MongoDB
beforeAll(async () => {
    if (mongoose.connection.readyState === 0) { // 0 表示未连接
        await mongoose.connect('mongodb://localhost:27017/project_manager_test');
    }
});

// 在每个测试后清理数据库
afterEach(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
});

// 在测试结束后断开 MongoDB 连接
afterAll(async () => {
    await mongoose.connection.close();
});

// 用户注册和登录测试用例
describe('用户注册和登录', () => {
    it('应该成功注册用户', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                studentId: '123456',
                password: 'password123',
                email: 'testuser@example.com'
            });

        expect(response.status).toBe(201);
        expect(response.text).toBe('用户注册成功');
    });

    it('应该成功登录用户', async () => {
        await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                studentId: '123456',
                password: 'password123',
                email: 'testuser@example.com'
            });

        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('登录时应返回401错误，用户名或密码错误', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.text).toBe('用户名或密码错误');
    });
});

// 项目路由测试用例
describe('项目路由测试', () => {
    let userId;
    let projectId;

    beforeEach(async () => {
        // 创建一个用户用于测试
        const user = new User({
            username: 'testuser',
            studentId: '123456',
            password: 'password123',
            email: 'testuser@example.com',
            joinedProjects: []
        });
        await user.save();
        userId = user._id;

        // 创建一个项目用于测试
        const project = new Project({
            name: 'Test Project',
            image: 'test-image.png',
            description: 'This is a test project.',
            type: '学生自主研究', // 使用有效的枚举值
        });
        const savedProject = await project.save();
        projectId = savedProject._id;
    });

    it('应该成功获取所有自带项目', async () => {
        const response = await request(app).get('/api/default-projects');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('应该成功发布新项目', async () => {
        const response = await request(app)
            .post('/api/projects')
            .send({
                name: 'New Project',
                image: 'new-image.png',
                description: 'This is a new project.',
                type: '教师指导学生研究' // 使用有效的枚举值
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('New Project');
    });

    it('应该成功获取所有项目', async () => {
        const response = await request(app).get('/api/projects');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1); // 之前创建的项目
    });

    it('应该成功删除项目', async () => {
        const response = await request(app).delete(`/api/projects/${projectId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('项目已删除');
    });

    it('应该成功获取单个项目', async () => {
        const response = await request(app).get(`/api/projects/${projectId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Project');
    });

    it('应该成功更新项目', async () => {
        const response = await request(app)
            .put(`/api/projects/${projectId}`)
            .send({ name: 'Updated Project', type: '学生自主研究' }); // 使用有效的枚举值

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Project');
    });

    it('应该成功获取用户已加入的项目', async () => {
        const response = await request(app).get(`/api/users/${userId}/projects`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('应该成功加入项目', async () => {
        const response = await request(app)
            .post(`/api/users/${userId}/projects`)
            .send({ projectId });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('项目已加入');
    });
});
