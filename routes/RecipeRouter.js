const bodyParser = require('body-parser');
var express = require('express');
const { doctorModel } = require('../model/Doctor');
const { hospitalModel } = require('../model/Hospital');
const { patientModel } = require('../model/Patient');
const {recipeModel} = require('../model/Recipe')
var router = express.Router();
router.use(bodyParser.json())



router.route("/")
    .get((req,res,next)=>{
      res.setHeader("Content-Type","application/json")
      recipeModel.find().then((recipes)=>{
        console.log("Successfully get all Recipe");
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Succesfully get all Recipe",
          data : recipes
        })
      })
      
    })
    .post((req,res,next)=>{
      recipeModel.create(req.body).then((recipe)=>{
        console.log("Created Recipe : "+recipe);
        res.statusCode = 200
        res.setHeader("Content-Type","application/json")
        res.send({
          code : 200,
          msg:"Succesfully Add Recipe",
          data : recipe
        })
      }).catch((err)=>{
        res.statusCode = 401
        res.setHeader("Content-Type","application/json")
        res.send({
          code : 401,
          msg:err._message
        })
      })

      // doctorModel.create(req.body).then((recipe)=>{
      //   console.log("Created Recipe : "+recipe);
      //   res.statusCode = 200
      //   res.setHeader("Content-Type","application/json")
      //   res.send({
      //     code : 200,
      //     msg:"Succesfully Add doctor",
      //     data : recipe
      //   })
      // })

      // hospitalModel.create(req.body).then((recipe)=>{
      //   console.log("Created Recipe : "+recipe);
      //   res.statusCode = 200
      //   res.setHeader("Content-Type","application/json")
      //   res.send({
      //     code : 200,
      //     msg:"Succesfully Add hospital",
      //     data : recipe
      //   })
      // })

      // patientModel.create(req.body).then((recipe)=>{
      //   console.log("Created Recipe : "+recipe);
      //   res.statusCode = 200
      //   res.setHeader("Content-Type","application/json")
      //   res.send({
      //     code : 200,
      //     msg:"Succesfully Add patient",
      //     data : recipe
      //   })
      // })
    })
    .put((req,res,next)=>{
      res.statusCode = 403
      res.send('This Operation not supported');
    })
    .delete((req,res,next)=>{

    })
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// Connect MongoDB at default port 27017.
module.exports = router;

