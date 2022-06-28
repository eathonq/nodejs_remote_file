const express = require('express');
const router = express.Router();
require('../lib/date-format.js');

router.get('/', function (req, res, next) {
  req.data = 'welcome to test server.' + (new Date()).format('yyyy-MM-dd hh:mm:ss');
  next();
});

router.get('/about', function (req, res, next) {
  req.data = 'about server.' + (new Date()).format('yyyy-MM-dd hh:mm:ss');
  next();
});

module.exports = router;