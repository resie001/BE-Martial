const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ratingsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

var doctorsSchema = new Schema({
    doctor_id: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

var hospitalSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
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
    speciality: {
        type: [String],
        required: true
    },
    ratings: [ratingsSchema],
    doctors: [doctorsSchema]
}, {
    timestamps: true
})

var Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital