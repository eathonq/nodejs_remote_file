let express = require('express');
let fs = require("fs");
let path = require("path");
let router = express.Router();

const multer = require('multer');
const multerUpload = multer({
    dest: './public/upload/',   // multer上传文件目录配置（从根目录开始算）
    limits: {
        fileSize: 1024 * 1024 * 30, // 文件大小限制 30M
        files: 100, // 文件上传数量限制
    }
});

const code = require('../model/code');

// 单文件上传
router.post('/file', multerUpload.single('file'), function (req, res, next) {
    if (req.file.length === 0) {
        next({ code: code.FILE_EMPTY });
        return;
    } else {
        let file = req.file;
        console.log(file);
        fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);  // 可以修改文件名称

        // let fileInfo = {};
        // fileInfo.mimetype = file.mimetype;
        // fileInfo.originalname = file.originalname;
        // fileInfo.size = file.size;
        // fileInfo.path = file.path;
        let _file = file.originalname;
        req.data = { file: _file };
        next();
    }
});

// 多文件上传
router.post('/files', multerUpload.array('files'), function (req, res, next) {
    if (req.files.length === 0) {
        next({ code: code.FILE_EMPTY });
        return;
    } else {
        // 校验保存目录
        let pathName = req.body.path;
        // 路径格式化
        pathName = pathName.replace(/\\/g, '/');
        // 去掉路径后面的/
        if (pathName.substr(-1) === '/') {
            pathName = pathName.substr(0, pathName.length - 1);
        }
        if (!fs.existsSync(pathName)) {
            next({ code: code.ERROR_PATH });
            return;
        }

        let _files = [];
        console.log(`count: ${req.files.length}`);
        for (let i = 0; i < req.files.length; i++) {
            let file = req.files[i];
            //console.log(file);
            console.log(`originalname: ${file.originalname}, size: ${file.size}, path: ${pathName}`);
            var source = path.join('./public/upload/', file.filename);
            var target = path.join(pathName, file.originalname);
            // 移动文件
            var readStream = fs.createReadStream(source);
            var writeStream = fs.createWriteStream(target);
            readStream.pipe(writeStream);

            _files.push(file.originalname);
        }

        req.data = { files: _files };
        next();
    }
});

// 定时清理文件
setInterval(function () {
    let files = fs.readdirSync('./public/upload/');
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let filePath = path.join('./public/upload/', file);
        let stats = fs.statSync(filePath);
        if (stats.isFile()) {
            let time = new Date().getTime() - stats.mtime.getTime();
            if (time > 1000 * 30) {
                fs.unlinkSync(filePath);
            }
        }
    }
}, 1000 * 30);

module.exports = router;