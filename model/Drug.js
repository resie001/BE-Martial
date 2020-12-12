const mongoose = require('mongoose'); 

var drugSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
});
const drugModel = mongoose.model('Drug', drugSchema);
module.exports = {
    drug : drugModel,
    schema : drugSchema
}