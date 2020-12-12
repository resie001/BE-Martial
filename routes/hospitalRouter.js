const bodyParser = require('body-parser');
var express = require('express');
const Hospital = require('../models/hospital');
var hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json())

hospitalRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;