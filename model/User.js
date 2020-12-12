const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    data_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    }
});
const userModel = mongoose.model('User', userSchema);
module.exports = {
    user : userModel,
    schema : userSchema
}