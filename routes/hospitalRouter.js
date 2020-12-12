const bodyParser = require('body-parser');
var express = require('express');
const Hospital = require('../models/hospital');
var hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json())

// Router Rumah Sakit dengan address '/'
hospitalRouter.route('/')
  .get((req, res) => {
    Hospital.find({}).then((hospitals) => {
      res.status = 201
      res.setHeader('Content-Type', 'application/json')
      res.json(hospitals)
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end = error.message.toString()
    })
  })
  .post((req, res) => {
    Hospital.create(req.body).then(() => {
      res.status = 201
      res.end('Berhasil menambahkan Rumah Sakit')
    })
  })
  .put((req, res) => {
    res.status = 403
    res.end('Put operation is not supported')
  })
  .delete((req, res) => {
    res.status = 403
    res.end('Delete operation is not supported')
  })

module.exports = hospitalRouter;