const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ratingSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        max : 5,
        min : 1
    },
    comment:{
        type:String,
        required:true,
        default:""
    }
});

//Export the model
module.exports = {
    ratingModel : mongoose.model('Rating', ratingSchema),
    ratingSchema : ratingSchema
};