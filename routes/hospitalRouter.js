const bodyParser = require('body-parser');
var express = require('express');
const Hospital = require('../models/hospital');
var hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json())

// Router List Rumah Sakit dengan address '/'
hospitalRouter.route('/')
  // Ambil List Rumah Sakit
  .get((req, res) => {
    Hospital.find({}).then((hospitals) => {
      res.status = 201
      res.setHeader('Content-Type', 'application/json')
      res.json(hospitals)
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(error.message.toString())
    })
  })
  // Tambah Rumah Sakit
  .post((req, res) => {
    Hospital.create(req.body).then(() => {
      res.status = 201
      res.end('Berhasil menambahkan Rumah Sakit')
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end = error.message.toString()
    })
  })
  // Method Put tidak support
  .put((req, res) => {
    res.status = 403
    res.end('Put operation is not supported')
  })
  // Method Delete tidak support
  .delete((req, res) => {
    res.status = 403
    res.end('Delete operation is not supported')
  })

// Router satuan Rumah sakit dengan address '/:hospitalId'
hospitalRouter.route('/:hospitalId')
  // Ambil info rumah sakit
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status = 201
      res.setHeader('Content-Type', 'application/json')
      res.json(hospital)
    })
  }).catch((error) => {
    res.status = error.statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(error.message.toString())
  })
  // Method Post tidak support
  .post((req, res) => {
    res.status = 403
    res.end('Post operation is not supported')
  })
  // update rumah sakit
  .put((req, res) => {
    Hospital.findByIdAndUpdate(req.params.hospitalId, { $set?: req.body }, { new: true }).then((hospital) => {
      res.status = 201
      res.end = "Update Berhasil"
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(error.message.toString())
    })
  })
  // hapus rumah sakit
  .delete((req, res) => {
    Hospital.findByIdAndRemove(req.params.hospitalId).then(() => {
      res.status = 201
      res.end = "Hapus berhasil"
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(error.message.toString())
    })
  })

// Route Speciality Rumah sakit dengan address '/hospitalId/specialities'
hospitalRouter.route('/:hospitalId/specialities')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.specialities.length != 0) {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json(hospital.specialities)
      } else {
        res.status = 201
        res.end("Speciality tidak ada")
      }
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(error.message.toString())
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status = error.statusCode
        res.setHeader('Content-Type', 'application/json')
        res.end(error.message.toString())
      } else {
        hospital.specialities.push(req.body.speciality)
        hospital.save((err, speciality) => {
          if (err) {
            res.status = error.statusCode
            res.setHeader('Content-Type', 'application/json')
            res.end(error.message.toString())
          } else {
            res.status = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(speciality)
          }
        })
      }
    }))
  })
  .put((req, res)=>{
    res.status = 403
    res.end('Put operation is not supported')
  })
  .delete((req, res)=>{
    res.status = 403
    res.end('Put operation is not supported')
  })

// hospitalRouter.route('/:hospitalId/ratings')

module.exports = hospitalRouter;