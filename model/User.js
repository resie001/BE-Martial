const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true
      },
      role: {
        type: String,
        default: "patient",
        enum: ["patient", "doctor", "superadmin"]
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
     data_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    }
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel