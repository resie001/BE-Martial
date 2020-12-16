// const mongoose = require('mongoose'); // Erase if already required
// const { doctorSchema } = require('./Doctor');
// const { ratingSchema } = require('./Rating');

// // Declare the Schema of the Mongo model
// var hospitalSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         index:true,
//     },
//     bio:{
//         type:String,
//         required:true,
//     },
//     address:{
//         type:String,
//         required:true,
//     },
//     speciality:[String],
//     rating:[ratingSchema],
//     doctors : [doctorSchema]
// });

// //Export the model
// module.exports = {
//     hospitalModel : mongoose.model('Hospital', hospitalSchema),
//     hospitalSchema : hospitalSchema
// };