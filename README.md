### 相关插件安装
- `npm install express --save`        # Express --save 本地安装
- `npm install body-parser --save`    # Body-Parser node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
- `npm install cookie-parser --save`  # Cookie-Parser 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
- `npm install multer --save`         # Multer node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

- `npm install pm2 --save`            # pm2 node.js 后台运行工具
- `pm2 init`                          # 初始化pm2配置文件 ecosystem.config.js

- `npm install`                       # 安装所有依赖

### 插件卸载
- `npm uninstall --save pm2`          # 卸载插件 --save 本地卸载

### 服务器项目目录结构
- bin                               # 存放启动脚本
- config                            # 存放配置文件
- lib                               # 存放常用类库模块
- log                               # 存放日志文件
- model                             # 存放数据模型
- public                            # 存放静态文件
- routes                            # 存放路由文件

### 服务器启动脚本与使用
- 项目目录放到指定目录下
- 使用PowerShell命令启动服务器(需要先进入项目目录) `npm start`
- 或者启动 bin/http-server.js        # 启动服务器脚本
- bin/upload-files.html             # 客户端上传文件页面
-     其中 action="http://localhost:3001/upload/files" 是上传文件的接口地址
-     其中 <select name="path" value="D:/"> 是文件上传到服务器位置
