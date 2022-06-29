let express = require('express');
let fs = require("fs");
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
        let path = req.body.path;
        // 去掉路径后面的/
        if (path.substr(-1) === '/') {
            path = path.substr(0, path.length - 1);
        }
        if (!fs.existsSync(path)) {
            next({ code: code.ERROR_PATH });
            return;
        }

        let _files = [];
        console.log(`count: ${req.files.length}`);
        for (let i = 0; i < req.files.length; i++) {
            let file = req.files[i];
            //console.log(file);
            console.log(`originalname: ${file.originalname}, size: ${file.size}, path: ${path}`);
            fs.renameSync('./public/upload/' + file.filename, path + '/' + file.originalname);  // 可以修改文件名称(转移到指定目录)
            _files.push(file.originalname);
        }

        req.data = { files: _files };
        next();
    }
});

module.exports = router;