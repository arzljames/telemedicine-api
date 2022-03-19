const mongoose = require("mongoose");
const User = require("../Models/User");

const NotificationSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },

  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },

  title: String,
  body: String,
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model(
  "Notification",
  NotificationSchema,
  "notification"
);
module.exports = Notification;
