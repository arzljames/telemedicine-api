const mongoose = require("mongoose");
const User = require("../Models/User");
const Facilities = require("../Models/Facilities");

const ReportSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    reportId: String,
    from: Date,
    to: Date,
    refer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Facilities,
    },
    specialization: String,
    age: Number,
    gender: String,
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema, "report");
module.exports = Report;
