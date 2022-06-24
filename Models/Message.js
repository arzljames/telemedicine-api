const mongoose = require("mongoose");
const User = require("../Models/User");
const Case = require("../Models/Case");

const MessageSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Case,
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },

    attachment: 
      {
        file: String,
        name: String,
      },
    
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema, "message");
module.exports = Message;
