const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var diseaseHisSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    detected_years:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["treatment","recover"]
    }
});

//Export the model
module.exports = {
    diseaseHisModel : mongoose.model('DiseaseHistory', diseaseHisSchema),
    diseaseHisSchema : diseaseHisSchema
};