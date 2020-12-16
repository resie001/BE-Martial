const bodyParser = require('body-parser');
var express = require('express');
const { patientModel } = require('../model/Patient');
var router = express.Router();
router.use(bodyParser.json())

router.route("/")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        patientModel.find().then((patients)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get all patient",
                data : patients
            })
        })
    })
    .post((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        patientModel.create(req.body).then((patient)=>{
            console.log(patient);
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully add patient",
                data : patient
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

    router.route("/:patientId")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        patientModel.findById(req.params.patientId).then((patient)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get a patient",
                data : patient
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