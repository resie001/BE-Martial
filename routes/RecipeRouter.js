const bodyParser = require('body-parser');
var express = require('express');
const {recipeModel} = require('../model/Recipe')
const {drugModel} = require('../model/Drug')
var router = express.Router();
router.use(bodyParser.json())


router.route("/")
    .get((req,res,next)=>{
      // res.send('respond with a resource');
      
    })
    .post((req,res,next)=>{
      recipeModel.create(req.body).then((recipe)=>{
        console.log("Created Drug : "+drug);
        res.statusCode = 200
        res.send("Created Drug : "+drug)
      })
    })
    .put((req,res,next)=>{
      res.statusCode = 403
      res.send('This Opperation not supported');
    })
    .delete((req,res,next)=>{

    })
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// Connect MongoDB at default port 27017.
module.exports = router;
