const mongoose = require("mongoose");
const { doctorSchema } = require("./Doctor");
const { ratingSchema } = require("./Rating");
const Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialities: [String],
    ratings: [ratingSchema],
    doctorsHospital: [doctorSchema]
}, {
    timestamps: true
})
var hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = hospital