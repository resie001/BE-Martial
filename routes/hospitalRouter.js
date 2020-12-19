const bodyParser = require('body-parser');
var express = require('express');
const auth = require('../middleware/auth');
const Hospital = require('../model/Hospital');
var hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json())

// Router List Rumah Sakit dengan address '/'
hospitalRouter.route('/')
  // Ambil List Rumah Sakit dengan middleware user
  .get(auth.isAuth, (req, res) => {
    Hospital.find({}).then((hospitals) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil list rumah sakit berhasil',
        data: hospitals
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Tambah Rumah Sakit dengan middleware admin
  .post(auth.isAdmin, (req, res) => {
    Hospital.create(req.body).then((hospital) => {
      res.status(201)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 201,
        message: 'Tambah Rumah Sakit berhasil',
        data: hospital
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
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
  // Ambil info rumah sakit dengan middleware user
  .get(auth.isAuth, (req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status(200)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil info Rumah Sakit berhasil',
        data: hospital
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Method Post tidak support
  .post((req, res) => {
    res.status = 404
    res.end('Post operation is not supported')
  })
  // update rumah sakit dengan middleware admin
  .put(auth.isAdmin,(req, res) => {
    Hospital.findByIdAndUpdate(req.params.hospitalId, { $set: req.body }, { new: true }).then(() => {
      res.status = 201
      res.json({
        status: 201,
        message: "Update Rumah Sakit berhasil"
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // hapus rumah sakit dengan middleware admin
  .delete(auth.isAdmin,(req, res) => {
    Hospital.findByIdAndRemove(req.params.hospitalId).then(() => {
      res.status(200)
      res.josn({
        status: 200,
        message: 'Hapus Rumah Sakit berhasil'
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })

// Route Speciality Rumah sakit dengan address '/hospitalId/specialities'
hospitalRouter.route('/:hospitalId/specialities')
  // Ambil info spesialis Rumah Sakit dengan middleware user
  .get(auth.isAuth,(req, res) => {
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
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 404,
          message: 'Spesialis belum ditambahkan'
        })
      }
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Menambahkan spesialis Rumah Sakit dengan middleware admin
  .post(auth.isAdmin,(req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      } else {
        hospital.specialities.push(req.body.speciality)
        hospital.save((err, speciality) => {
          if (err) {
            res.status(400)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: 400,
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
  // Mengupdate salah satu spesialis Rumah Sakit dengan middleware admin
  .put(auth.isAdmin,(req, res) => {
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
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
    })
  })
  })
  // Menghapus salah salu spesialis Rumah Sakit dengan middleware admin
  .delete(auth.isAdmin,(req, res) => {
    Hospital.findById(req.params.hospitalId, ((error, hospital) => {
      if (error) {
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      } else {
        hospital.specialities.pull(req.body.speciality)
        hospital.save((error, speciality) => {
          if (error) {
            res.status(400)
            res.setHeader('Content-Type', 'application/json')
            res.json({
              status: 400,
              message: error.message.toString()
            })
          }
        }).catch((err)=>{
            console.log(err);
            res.statusCode = 400
            res.send({
                code : 400,
                msg:"Error : "+err._message,
                data : null
            })
          })
        }
        }))
      })
      

// Route untuk list Rating Rumah Sakit
hospitalRouter.route('/:hospitalId/ratings')
  // Ambil list rating Rumah Sakit dengan middleware user
  .get(auth.isAuth, (req, res) => {
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
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 404,
          message: 'Rating Rumah Sakit masih kosong'
        })
      }
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Tambah rating Rumah Sakit dengan middleware user
  .post(auth.isAuth, (req, res) => {
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
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      })
    })
  })
  // Method Put tidak support untuk rating Rumah Sakit
  .put((req, res) => {
    res.status(404)
    res.end('Put operation is not supported')
  })
  // Method Delete tidak support untuk rating Rumah Sakit
  .delete((req, res) => {
    res.status(404)
    res.end('Delete operation is not supported')
  })

// Router untuk satuan rating Rumah Sakit
hospitalRouter.route('/:hospitalId/ratings/:ratingId')
  // Ambil salah satu rating Rumah Sakit dengan middleware user
  .get(auth.isAuth, (req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      res.status(200),
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 200,
        message: 'Ambil Info Rating Rumah Sakit berhasil',
        data: hospital.ratings.id(req.params.ratingId)
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Method Post tidak support untuk satuan rating Rumah Sakit
  .post((req, res) => {
    res.status(404)
    res.end('Post operation is not supported')
  })
  // Mengupdate salah satu rating Rumah Sakit dengan middleware user
  .put(auth.isAuth, (req, res) => {
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
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Menghapus salah satu rating Rumah Sakit dengan middleware user
  .delete(auth.isAuth, (req, res) => {
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
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })

// Route untuk list dokter pada Rumah Sakit
hospitalRouter.route('/:hospitalId/doctors')
  // Mengambil list dokter Rumah Sakit dengan middleware user
  .get(auth.isAuth, (req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      if (hospital.doctorsHospital.length != 0) {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:200,
          message:'Ambil list dokter Rumah Sakit berhasil',
          data:hospital.doctorsHospital
        })
      } else {
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:404,
          message:'List dokter Rumah Sakit kosong'
        })
      }
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Menambahkan dokter pada Rumah Sakit dengan middleware dokter
  .post(auth.isAdmin, (req, res) => {
    Hospital.findById(req.params.hospitalId).then((hospital) => {
      hospital.doctorsHospital.push(req.body)
      hospital.save().then(() => {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status:200,
          message:'Tambah dokter Rumah Sakit berhasil'
        })
      }).catch((error) => {
        res.status(400)
        res.setHeader('Content-Type', 'application/json')
        res.json({
          status: 400,
          message: error.message.toString()
        })
      })
    }).catch((error) => {
      res.status(400)
      res.setHeader('Content-Type', 'application/json')
      res.json({
        status: 400,
        message: error.message.toString()
      })
    })
  })
  // Method Put tidak supported untuk list dokter Rumah Sakit
  .put((req, res) => {
    res.status(403)
    res.end('Put operation is not supported')
  })
  // Method Delete tidak supported untuk list dokter rumah sakit
  .delete((req, res) => {
    res.status(403)
    res.end('Delete operation is not supported')
  })

module.exports = hospitalRouter;
