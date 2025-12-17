const mongoose = require("mongoose");

// User Model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    online: { type: Boolean, default: false },
    lastseen: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema); 