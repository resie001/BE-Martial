const bodyParser = require('body-parser');
var express = require('express');
const { hospitalModel } = require('../model/Hospital');
var router = express.Router();
router.use(bodyParser.json())

router.route("/")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        hospitalModel.find().then((hospitals)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get all hospital",
                data : hospitals
            })
        })
    })
    .post((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        hospitalModel.create(req.body).then((hospital)=>{
            console.log(hospital);
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully add hospital",
                data : hospital
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

    router.route("/:hospitalId")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        hospitalModel.findById(req.params.hospitalId).then((hospital)=>{
            res.statusCode = 200
            res.send({
                code : 200,
                msg:"Succesfully get a hospital",
                data : hospital
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