const mongoose = require('mongoose'); 

var drugSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
},{
    versionKey:false
});
const drugModel = mongoose.model('Drug', drugSchema);
module.exports = {
    drugModel : drugModel,
    drugSchema : drugSchema
}