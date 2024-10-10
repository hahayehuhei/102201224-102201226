# 目录说明和使用说明
## 目录说明
/project
│
├── images                   // 存放项目图片
│   ├── project1.jpg        // 高等数学研究项目的图片
│   ├── project2.jpg        // 福大建筑美学项目的图片
│   ├── project3.jpg        // 风景园林规划实训项目的图片
│   ├── project4.jpg        // 孙子兵法实操项目的图片
│   ├── project5.jpg        // 嵌入式系统原理研究项目的图片
│   ├── project6.jpg        // 企鹅生活习性观察项目的图片
│   ├── avatar1.jpg         // 好友1的头像
│   └── avatar2.jpg         // 好友2的头像
│
├── node_modules            // 存放项目依赖的Node.js模块
│
├── routes                  // 存放路由文件
│   ├── projectRoutes.js    // 处理项目相关API的路由
│   └── add.js              // 数据库初始化和项目添加的逻辑
│
├── models                  // 存放数据模型         
│   ├── Project.js          // 项目模型
│   └── user.js             // 用户模型
│
├── project-detail.html     // 项目详情页面
├── server.js               // 后端服务器启动文件
├── projects.html           // 项目列表页面
├── publish-project.html     // 发布新项目页面
├── package.json            // 项目依赖描述文件
├── package-lock.json       // 锁定依赖版本的文件
├── main.html               // 主页
├── login.html              // 登录页面
├── mine.html               // 我的资料页面
├── friends.html            // 好友列表页面
├── chat.html               // 私聊页面
├── forget.html             // 忘记密码页面
├── register.html           // 注册页面
└── edit-profile.html       // 编辑资料页面
└── default-project-detail.html // 默认项目详情页面
└── style.css               // 样式文件
## 使用说明
### 1.在我们的[github仓库](https://github.com/hahayehuhei/102201224-102201226)下载源代码，进行解压缩。
将依赖文件压缩包**node_modules.zip**压缩到**project**文件夹内
![](https://img2024.cnblogs.com/blog/3512106/202410/3512106-20241010203603605-1716140103.png)
### 2.安装node.js
要安装 Node.js，首先访问 [Node.js](https://nodejs.org/en) 官方网站，下载适合您操作系统的安装包（Windows、macOS 或 Linux）。在 Windows 上，运行 .msi 文件并按照提示安装，确保勾选**Add to PATH**选项；在 macOS 上，您可以使用 Homebrew 安装，命令为 brew install node；在 Linux 上，可以使用包管理器（如 apt 或 yum）或 NodeSource 安装。安装完成后，通过在终端或命令提示符中运行 node -v 和 npm -v 来验证安装是否成功。
### 3.安装mongodb
要安装 MongoDB，首先访问 [MongoDB 官方网站](https://www.mongodb.com/try/download/community)，选择适合您操作系统的 MongoDB Community Server 安装包。在 Windows 上，下载 .msi 文件并运行安装向导，按照提示进行安装，并确保选择**Install MongoDB as a Service**选项；在 macOS 上，您可以使用 Homebrew，命令为 brew tap mongodb/brew，然后执行 brew install mongodb-community；在 Linux 上，可以使用包管理器（如 apt 或 yum）或按照 MongoDB 文档提供的步骤进行安装。安装完成后，您可以通过在终端或命令提示符中运行 mongod 启动 MongoDB 服务，接着使用 mongo 命令连接到 MongoDB 数据库。
### 4.运行服务器
以管理员身份运行cmd，输入命令**net start MongoDB**来启动MongoDB服务
![](https://img2024.cnblogs.com/blog/3512106/202410/3512106-20241010182020607-53640684.png)
再打开cmd，进入project文件夹，输入**node server.js**以启动服务器
![](https://img2024.cnblogs.com/blog/3512106/202410/3512106-20241010181512766-700740930.png)
*此时可以正常运行和使用网页了
### 5.运行测试用例
打开cmd在project路径下输入npm test即可使用测试用例
![](https://img2024.cnblogs.com/blog/3512106/202410/3512106-20241010203443242-1971404198.png)