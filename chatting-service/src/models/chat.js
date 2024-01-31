const mongoose = require('mongoose');

// Room Schema
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date, default: Date.now
    }
});

const messageSchema = new mongoose.Schema({
    content: {
        type: String, required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
});


const Room = mongoose.model('Room', roomSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { User, Room, Message };
