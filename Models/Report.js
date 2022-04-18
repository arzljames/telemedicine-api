const mongoose = require("mongoose");
const User = require("../Models/User");
const Facilities = require("../Models/Facilities");

const ReportSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: false,
    },
    reportId: {
      type: String,
      required: false,
    },
    from: { type: Date, required: false },
    to: { type: Date, required: false },
    refer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Facilities,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: false,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema, "report");
module.exports = Report;
