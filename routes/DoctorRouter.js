const bodyParser = require('body-parser');
var express = require('express');
const { doctorModel } = require('../model/Doctor');
var router = express.Router();
router.use(bodyParser.json())

router.route("/")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        doctorModel.find().then((doctors)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get all doctor",
                data : doctors
            })
        })
    })
    .post((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        doctorModel.create(req.body).then((doctor)=>{
            console.log(doctor);
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully add doctor",
                data : doctor
            })
        }).catch((err)=>{
            console.log(err);
            res.statusCode = 400
            res.send({
                code : 400,
                msg:"Error : "+err._message,
                data : null
            })
        })  
    })
    .put((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation not supported');
    })
    .delete((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported, We Want to keep all the data');
    })

    router.route("/:doctorId")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        doctorModel.findById(req.params.doctorId).then((doctor)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get a doctor",
                data : doctor
            })
        }).catch((err)=>{
            res.statusCode = 400
            res.send({
              code : 400,
              msg:"Bad Request",
              data : null
            })
          })
    })
    .post((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation not supported');
    })
    .put((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation not supported');
    })
    .delete((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported, We Want to keep all the data');
    })
    
module.exports = router;