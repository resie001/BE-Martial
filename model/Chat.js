const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var chatSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
},{timestamps:true});

//Export the model
module.exports = {
    chatModel : mongoose.model('Chat', chatSchema),
    chatSchema:chatSchema
};