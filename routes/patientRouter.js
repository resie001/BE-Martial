const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { patientModel } = require('../model/Patient')
const patientRouter = express.Router()
patientRouter.use(bodyParser.json())

patientRouter.route('/')
    .get((req,res,next)=>{
        patientModel.find({}).then((patients)=>{
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.json(patients);
        })
    })
    .post((req,res,next)=>{
        patientModel.create(req.body)
         .then((patients)=>{
           console.log("created", patients)
           res.statusCode = 200
           res.setHeader('Content-type','application/json')
           res.json(patients)
         })
    })
    .put((req,res,next)=>{
        res.statusCode = 403
        res.end('put not suported')
    })
    .delete((req,res,next)=>{
        patientModel.remove.then((resp)=>{
            console.log('All dishes deleted')
            res.statusCode = 200
            res.setHeader('Content-type','application/json')
            res.json(resp)
        })
    })


module.exports = patientRouter