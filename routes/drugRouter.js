const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { drugModel } = require("../model/Drug");
const drugRouter = express.Router();
drugRouter.use(bodyParser.json());


drugRouter.route("/").get((req, res, next) => {
    drugModel.find({}).then((drugs) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(drugs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})
. post((req, res, next) => {
    const drug  = new drugModel ({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
    });
    drug.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST request to /drug",
            createdDrug: result
        });
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({
        error : err
        });    
    });
})
.put((req, res, next) => {
    res.status(403);
    res.end("PUT operation is not supported");
})
.delete((req, res, next) => {
    drugModel.remove().then ((resp) => {
        console.log("All drugs deleted");
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    });
});

//Respon dengan parameter
drugRouter.route("/:drugId").get((req, res, next) => {
    drugModel.findById(req.params.drugId).then((drug) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(drug);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})
.post((req, res, next) => {
    res.status(403);
    res.end("PUT operation is not supported");
})
.put((req, res, next) => {
    const id = req.params.drugId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;

    }
    drugModel.update({ _id: id }, { $set: updateOps})
    .exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
})
.delete((req, res, next) => {
    const id = req.params.drugId;
    drugModel.remove({_id : id})
    .exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

module.exports = drugRouter;