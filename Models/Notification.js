const mongoose = require("mongoose");
const User = require("../Models/User");
const Patient = require("../Models/Patient");
const Case = require("../Models/Case");

const NotificationSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  specialization: {
    type: String,
  },

  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient,
  },

  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Case,
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
