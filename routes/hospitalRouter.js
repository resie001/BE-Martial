const bodyParser = require('body-parser');
var express = require('express');
const Hospital = require('../model/hospital');
var hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json())

// Router List Rumah Sakit dengan address '/'
hospitalRouter.route('/')
  // Ambil List Rumah Sakit
  .get((req, res) => {
    Hospital.find({}).then((hospitals) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil list rumah sakit berhasil',
        data: hospitals
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  // Tambah Rumah Sakit
  .post((req, res) => {
    Hospital.create(req.body).then((hospital) => {
      res.status(201)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 201,
        message: 'Tambah Rumah Sakit berhasil',
        data: hospital
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  // Method Put tidak support
  .put((req, res) => {
    res.status(404)
    res.end('Put operation is not supported')
  })
  // Method Delete tidak support
  .delete((req, res) => {
    res.status(404)
    res.end('Delete operation is not supported')
  })

// Router satuan Rumah sakit dengan address '/:hospitalId'
hospitalRouter.route('/:hospitalId')
  // Ambil info rumah sakit
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil info Rumah Sakit berhasil',
        data: hospital
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  // Method Post tidak support
  .post((req, res) => {
    res.status = 404
    res.end('Post operation is not supported')
  })
  // update rumah sakit
  .put((req, res) => {
    Hospital.findByIdAndUpdate(req.params.hospitalId, { $set: req.body }, { new: true }).then(() => {
      res.status = 201
      res.json({
        status: 201,
        message: "Update Rumah Sakit berhasil"
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  // hapus rumah sakit
  .delete((req, res) => {
    Hospital.findByIdAndRemove(req.params.hospitalId).then(() => {
      res.status(200)
      res.josn({
        status: 200,
        message: 'Hapus Rumah Sakit berhasil'
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })

// Route Speciality Rumah sakit dengan address '/hospitalId/specialities'
hospitalRouter.route('/:hospitalId/specialities')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.specialities.length != 0) {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 200,
          message: 'Ambil List Spesialis Rumah Sakit berhasil',
          data: hospital.specialities
        })
      } else {
        res.status(204)
        res.end("Speciality tidak ada")
      }
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.end(error.message.toString())
      } else {
        hospital.specialities.push(req.body.speciality)
        hospital.save((err, speciality) => {
          if (err) {
            res.status(error.statusCode)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: error.statusCode,
              message: error.message.toString()
            })
          } else {
            res.status(201)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: 201,
              message: 'Tambah spesialis Rumah Sakit berhasil',
              data: speciality
            })
          }
        })
      }
    }))
  })
  .put((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.specialities.pull(req.body.old_speciality)
      hospital.specialities.push(req.body.speciality)
      hospital.save().then(() => {
        res.status(201)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 201,
          message: 'Update spesialis Rumah Sakit berhasil'
        })
      }).catch((error) => {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .delete((req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      } else {
        hospital.specialities.pull(req.body.speciality)
        hospital.save((error, speciality) => {
          if (error) {
            res.status(error.statusCode)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: error.statusCode,
              message: error.message.toString()
            })
          } else {
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: 200,
              message: 'Hapus spesialis Rumah Sakit berhasil'
            })
          }
        })
      }
    }))
  })

hospitalRouter.route('/:hospitalId/ratings')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.ratings.length != 0) {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 200,
          message: 'Ambil rating Rumah Sakit berhasil',
          data: hospital.ratings
        })
      } else {
        res.status(204)
        res.json({
          status: 204,
          message: 'Rating Rumah Sakit masih kosong'
        })
      }
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.push(req.body)
      hospital.save().then(() => {
        res.status(201)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 201,
          message: 'Tambah rating Rumah Sakit berhasil'
        })
      }).catch((error) => {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      })
    })
  })
  .put((req, res) => {
    res.status(404)
    res.end('Put operation is not supported')
  })
  .delete((req, res) => {
    res.status(404)
    res.end('Delete operation is not supported')
  })

hospitalRouter.route('/:hospitalId/ratings/:ratingId')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil Info Rating Rumah Sakit berhasil',
        data: hospital.ratings.id(req.params.ratingId)
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .post((req, res) => {
    res.status(404)
    res.end('Post operation is not supported')
  })
  .put((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.id(req.params.ratingId).remove()
      hospital.ratings.push(req.body)
      hospital.save().then(() => {
        res.status(201)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 201,
          message: 'Update Rating berhasil'
        })
      }).catch((error) => {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .delete((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.id(req.params.ratingId).remove()
      hospital.save().then(() => {
        res.status(201)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:201,
          message:'Hapus rating Rumah Sakit berhasil'
        })
      }).catch((error) => {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })

hospitalRouter.route('/:hospitalId/doctors')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.doctors.length != 0) {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:200,
          message:'Ambil list dokter Rumah Sakit berhasil',
          data:hospital.doctors
        })
      } else {
        res.status(204)
        res.json({
          status:204,
          message:'List dokter Rumah Sakit kosong'
        })
      }
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.doctors.push(req.body)
      hospital.save().then(() => {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:200,
          message:'Tambah dokter Rumah Sakit berhasil'
        })
      }).catch((error) => {
        res.status(error.statusCode)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: error.statusCode,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(error.statusCode)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: error.statusCode,
        message: error.message.toString()
      })
    })
  })
  .put((req, res) => {
    res.status(403)
    res.end('Put operation is not supported')
  })
  .delete((req, res) => {
    res.status(403)
    res.end('Delete operation is not supported')
  })

module.exports = hospitalRouter;