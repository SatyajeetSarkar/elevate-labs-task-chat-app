const mongoose = require("mongoose");

// Message Model
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    text: String,
    receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema); 
