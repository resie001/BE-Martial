const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
    username: String,
    googleId: String,
    role: {
        type: String,
        default: "user",
        enum: ["user", "dokter", "superadmin"]
      }
}
);

const User = mongoose.model('user', userSchema);

module.exports = User;
