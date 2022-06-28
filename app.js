const express = require('express');
const app = express();

// 设置静态资源(需要在其他路由之前设置)
app.use(express.static('public'));

// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        //res.send(200);
        res.sendStatus(200);
    } else {
        next();
    }
});

// 设置 bodyParser
// const bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();      // parse application/json
// var urlencodedParser = bodyParser.urlencoded({ extended: false });   // parse application/x-www-form-urlencoded
// 全局设置
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// 设置路由
const indexRouter = require('./routes/index');
const upload = require('./routes/upload');
//const download = require('./routes/download');

app.use('/', indexRouter);
app.use('/upload', upload);
//app.use('/download', download);

const code = require('./model/code');
// 设置成功返回
app.use(function (req, res, next) {
    if (req.data) {
        res.json({
            code: code.SUCCESS,
            message: code.Info(code.SUCCESS),
            data: req.data
        });
    }
    else{
        res.json({
            code: code.NOT_FOUND,
            message: code.Info(code.NOT_FOUND)
        });
    }
    res.end();
});

// 设置错误返回
app.use(function (err, req, res, next) {
    let _code = err.code || code.ERROR;
    let _message = err.message || code.Info(_code);
    res.json({
        code: _code,
        message: _message,
    });
    res.end();
});

module.exports = app;