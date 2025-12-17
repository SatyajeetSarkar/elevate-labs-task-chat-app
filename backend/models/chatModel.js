const mongoose = require("mongoose");

// Chat Model
const ChatSchema = new mongoose.Schema({
    name: String,
    group: { type: Boolean, default: false },
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['owner', 'admin', 'member'], default: 'member' }
    }],
    lastmessage: { type: String, ref: 'Message' }
}, { timestamps: true });

module.exports = mongoose.model("Chat", ChatSchema); 
 