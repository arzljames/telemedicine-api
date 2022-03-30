const mongoose = require("mongoose");
const User = require("../Models/User");

const ChatSchema = new mongoose.Schema(
  {
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },

    attachment: [
      {
        file: String,
        name: String,
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema, "chat");
module.exports = Chat;
