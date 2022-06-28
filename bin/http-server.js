const http = require('http');
const app = require('../app');

const config = require('../config/config');
// 设置端口
const port = process.env.PORT || config.server.port;
app.set('port', port);

http.createServer(app).listen(port);

console.log('http server listening on port ' + port);