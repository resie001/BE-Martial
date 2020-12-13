const bodyParser = require('body-parser');
var express = require('express');
const { doctorModel } = require('../model/Doctor');
const { hospitalModel } = require('../model/Hospital');
const { patientModel } = require('../model/Patient');
const {recipeModel, itemRecipeModel} = require('../model/Recipe')
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
      res.statusCode = 403
      res.send('This Operation not supported, we want to keep all the recipes history');
    })
router.route("/:recipeId")
    .get((req,res,next)=>{
      res.setHeader("Content-Type","application/json")
      recipeModel.findOne({_id:req.params.recipeId}).then((recipe)=>{
        console.log(recipe);
        if (recipe == null) throw(new Error)
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Succesfully get a Recipe",
          data : recipe
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
      res.setHeader("Content-Type","application/json")
      recipeModel.findByIdAndUpdate({_id:req.params.recipeId},{note:req.body.note})
        .then((recipe)=>{
          res.statusCode = 200
          res.send({
            code : 200,
            msg:"Successfully update notes",
            data : recipe
          })
        }).catch((err)=>{
          res.statusCode = 400
            res.send({
              code : 400,
              msg:"Failed to update notes, "+err._message,
              data : null
            })
        })
    })
    .delete((req,res,next)=>{
      res.statusCode = 403
      res.send('This Operation not supported , we want to keep all recipes history');
    })

router.route("/:recipeId/drugs")
    .get((req,res,next)=>{
      res.setHeader("Content-Type","application/json")
      recipeModel.findById(req.params.recipeId).then((recipe)=>{
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Succesfully get all Recipe",
          data : recipe.drugs
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
      res.setHeader("Content-Type","application/json")
      recipeModel.findById(req.params.recipeId).then((recipe)=>{
        recipe.drugs.push(new itemRecipeModel(req.body))
        recipe.save(function(err){
          if (err) {
            res.statusCode = 400
            res.send({
              code : 400,
              msg:"Failed to update drugs list, "+err._message,
              data : null
            })
            return console.log(err._message);
          }
        })
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Succesfully update drugs",
          data : recipe.drugs
        })
      })
    })
    .delete((req,res,next)=>{
      res.setHeader("Content-Type","application/json")
      recipeModel.findById(req.params.recipeId).then((recipe)=>{
        recipe.drugs = []
        recipe.save(function(err){
          if (err) {
            res.statusCode = 400
            res.send({
              code : 400,
              msg:"Failed to clear drugs list, "+err._message,
              data : null
            })
            return console.log(err._message);
          }
        })
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Successfully clear all drugs",
          data : recipe.drugs
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
router.route("/:recipeId/drugs/:drugsId")
    .delete((req,res,next)=>{
      res.setHeader("Content-Type","application/json")
      recipeModel.findById(req.params.recipeId).then((recipe)=>{
        recipe.drugs.id(req.params.drugsId).remove();
        recipe.save(function(err){
          if (err) {
            res.statusCode = 400
            res.send({
              code : 400,
              msg:"Failed to delete drug from list, "+err._message,
              data : null
            })
            return console.log(err._message);
          }
        })
        res.statusCode = 200
        res.send({
          code : 200,
          msg:"Successfully delete a drug",
          data : recipe.drugs
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
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// Connect MongoDB at default port 27017.
module.exports = router;

