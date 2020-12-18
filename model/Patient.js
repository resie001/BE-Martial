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
// db.patient.insert({"name":"halo", "birth_date":"20-01-1989", "sex":"P", "address":"Jakarta", "disease_history":""})
//Export the model
const patientModel = mongoose.model('Patient', patientSchema);
module.exports = {
    patientModel : patientModel,
    patientSchema : patientSchema
}