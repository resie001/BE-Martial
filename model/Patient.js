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
    },
    address:{
        type:String,
        required:true,
    },
    disease_history:[diseaseHisSchema]
});

//Export the model
const patientModel = mongoose.model('Patient', patientSchema);
module.exports = {
    patientModel : patientModel,
    patientSchema : patientSchema
}