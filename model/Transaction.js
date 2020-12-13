const mongoose = require('mongoose'); // Erase if already required
const { chatSchema } = require('./Chat');

// Declare the Schema of the Mongo model
var transactionSchema = new mongoose.Schema({
    status :{
        type:String,
        required:[true,"Please Define the status"]
    },
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Patient"
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Doctor"
    },
    chat:[chatSchema]
},{timestamps:true});

//Export the model
module.exports = {
    transactionModel : mongoose.model('Transaction', transactionSchema),
    transactionSchema : transactionSchema
};