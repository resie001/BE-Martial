const mongoose = require('mongoose'); // Erase if already required
const { diseaseHisSchema } = require('./Disease_History');

// Declare the Schema of the Mongo model
var patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    birth_date :{
        type:String,
        required:true,
    },
    sex:{
        type:String,
        required:true,
        enum: ["pria", "wanita"]
    },
    address:{
        type:String,
        required:true,
    },
    disease_history:[diseaseHisSchema]
});

//Export the model
module.exports = {
    patientModel : mongoose.model('Patient', patientSchema),
    patientSchema : patientSchema
};
