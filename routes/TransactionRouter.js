const bodyParser = require('body-parser');
var express = require('express');
const { chatModel } = require('../model/Chat');
const { transactionModel } = require('../model/Transaction');
var router = express.Router();
router.use(bodyParser.json())

router.route("/")
    .get((req,res,next)=>{
        transactionModel.find().then((transactions)=>{
            console.log("get all Transaction Success");
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.send({
                code : 200,
                msg:"Succesfully get all Transaction",
                data : transactions
                })
        })
    })
    .post((req,res,next)=>{
        transactionModel.create(req.body).then((transaction)=>{
            console.log("Successfully add Transaction : "+transaction);
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.send({
                code : 200,
                msg:"Succesfully add Transaction",
                data : transaction
                })
        }).catch((err)=>{
            console.log(err);
            console.log(err.errors.patient_id);
            console.log(err.errors.doctor_id);
            msg = "";
            res.statusCode = 400
            res.setHeader("Content-Type","application/json")
            if (err.errors.patient_id != undefined || err.errors.doctor_id != undefined) {
                msg += "Bad Request, "
                msg += err.errors.patient_id == undefined? "doctor" : "patient"
                msg += " id is not registered"
            }else{
                msg += err._message
            }
            res.send({
                code : 400,
                msg:msg,
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
        res.send('This Operation is not supported, We Want to keep all the transaction');
    })

router.route("/:transactionId")
    .get((req,res,next)=>{
        transactionModel.findById(req.params.transactionId).then((transaction)=>{
            console.log("get a Transaction Success");
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.send({
                code : 200,
                msg:"Succesfully get a Transaction",
                data : transaction
                })
        })
    })
    .post((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported');
    })
    .put((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        if (req.body.status == undefined) {
            next()   
        }
        transactionModel.findOneAndUpdate({_id : req.params.transactionId},{status:req.body.status})
        .then(()=>{
            console.log("succesfully update a Transaction");
            res.statusCode = 200
            res.send({ 
                code : 200,
                msg:"Succesfully update a Transaction"
                })
        }).catch((err)=>{
            res.statusCode = 400
            res.send({
                code : 400,
                msg:"Bad Request , "+err._message
                })
        })
    })
    .delete((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported, We Want to keep all the transaction');
    })

router.route("/:transactionId/chat")
    .get((req,res,next)=>{
        transactionModel.findById(req.params.transactionId).then((transaction)=>{
            console.log("get all chat Success");
            res.statusCode = 200
            res.setHeader("Content-Type","application/json")
            res.send({
                code : 200,
                msg:"Succesfully get all chat from transaction",
                data : transaction.chat
                })
        })
    })
    .post((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
        transactionModel.findById(req.params.transactionId).then((transaction)=>{
            console.log("post new chat Success");
            transaction.chat.push(new chatModel(req.body));
            transaction.save(function(err,chat){
                if (err) {
                    res.statusCode = 400
                    res.send({
                        code : 400,
                        msg:"Failed post a new chat : "+err._message,
                        data : null
                        })
                    return console.log(err._message);
                }
                res.statusCode = 200
                res.send({
                    code : 200,
                    msg:"Succesfully post a new chat",
                    data : chat
                    })
                })
            
        })
    })
    .put((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported');
    })
    .delete((req,res,next)=>{
        res.statusCode = 403
        res.send('This Operation is not supported, We Want to keep all the chat');
    })
module.exports = router;