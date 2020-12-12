const mongoose = require('mongoose'); // Erase if already required
const { chatSchema } = require('./Chat');

// Declare the Schema of the Mongo model
var transactionSchema = new mongoose.Schema({
    status :{
        type:String,
        required:true
    },
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    chat:[chatSchema]
});

//Export the model
module.exports = {
    transactionModel : mongoose.model('Transaction', transactionSchema),
    transactionSchema : transactionSchema
};