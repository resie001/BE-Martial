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
      res.end(error.message.toString())
    })
  })
  // Tambah Rumah Sakit
  .post((req, res) => {
    Hospital.create(req.body).then((hospital) => {
      console.log('Dish Created', hospital)
      res.status = 201
      res.setHeader('Content-Type', 'application/json')
      res.json('Berhasil menambahkan Rumah Sakit')
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
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
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })
  // Method Post tidak support
  .post((req, res) => {
    res.status = 403
    res.end('Post operation is not supported')
  })
  // update rumah sakit
  .put((req, res) => {
    Hospital.findByIdAndUpdate(req.params.hospitalId, { $set: req.body }, { new: true }).then(() => {
      res.status = 201
      res.end("Update Berhasil")
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })
  // hapus rumah sakit
  .delete((req, res) => {
    Hospital.findByIdAndRemove(req.params.hospitalId).then(() => {
      res.status = 201
      res.end("Hapus berhasil")
    }).catch((error) => {
      res.status = error.statusCode
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
  .put((req, res) => {
    res.status = 403
    res.end('Put operation is not supported')
  })
  .delete((req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status = error.statusCode
        res.end(error.message.toString())
      } else {
        hospital.specialities.pull(req.body.speciality)
        hospital.save((error, speciality) => {
          if (error) {
            res.status = error.statusCode
            res.end(error.message.toString())
          } else {
            res.status = 201
            res.setHeader('Content-Type', 'application/json')
            res.json(speciality)
          }
        })
      }
    }))
  })

hospitalRouter.route('/:hospitalId/ratings')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.ratings.length != 0) {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json(hospital.ratings)
      } else {
        res.status = 404
        res.end("Rating rumah sakit masih kosong")
      }
    }).catch((error) => {
      res.status = error.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(error.message.toString())
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.push(req.body)
      hospital.save().then(() => {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json("Tambah rating berhasil")
      }).catch((error) => {
        res.status = error.statusCode
        res.end(error.message.toString())
      })
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

hospitalRouter.route('/:hospitalId/ratings/:ratingId')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status = 201
      res.setHeader('Content-Type', 'application/json')
      res.json(hospital.ratings.id(req.params.ratingId))
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })
  .post((req, res) => {
    res.status = 403
    res.end('Post operation is not supported')
  })
  .put((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.id(req.params.ratingId).remove()
      hospital.ratings.push(req.body)
      hospital.ratings.save().then(() => {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json("Update rating berhasil")
      }).catch((error) => {
        res.status = error.statusCode
        res.end(error.message.toString())
      })
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })
  .delete((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.ratings.id(req.params.ratingId).remove()
      hospital.ratings.save().then(() => {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json("Hapus rating berhasil")
      }).catch((error) => {
        res.status = error.statusCode
        res.end(error.message.toString())
      })
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })

hospitalRouter.route('/:hospitalId/doctors')
  .get((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.doctors.length != 0) {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.json(hospital.ratings)
      } else {
        res.status = 404
        res.end('Belum menambahkan doktor')
      }
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
    })
  })
  .post((req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.doctors.push(req.body)
      hospital.doctors.save().then(() => {
        res.status = 201
        res.setHeader('Content-Type', 'application/json')
        res.end('Tambah dokter berhasil')
      }).catch((error) => {
        res.status = error.statusCode
        res.end(error.message.toString())
      })
    }).catch((error) => {
      res.status = error.statusCode
      res.end(error.message.toString())
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