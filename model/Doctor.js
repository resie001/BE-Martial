const mongoose = require('mongoose'); 
const { ratingSchema } = require('./Rating');

var doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    bio:{
        type:String,
        required:true,
    },
    expertise:{
        type:[String],
        required:true,
    },
    medical_experience:{
        type:Number,
        required:true,
    },
    work_field : {
        id_hospital : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        },
        job:String
    },
    rating : [ratingSchema]
});

//Export the model
module.exports = {
    doctorModel : mongoose.model('Doctor', doctorSchema),
    doctorSchema : doctorSchema
};
