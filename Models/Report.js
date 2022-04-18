const mongoose = require("mongoose");
const User = require("../Models/User");

const ReportSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    reportId: String,
    from: Date,
    to: Date,
    refer: String,
    specialization: String,
    age: Number,
    gender: String,
    physician: String,
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema, "report");
module.exports = Report;
