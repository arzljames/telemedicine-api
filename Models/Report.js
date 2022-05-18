const mongoose = require("mongoose");
const User = require("../Models/User");

const ReportSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    reportId: {
      type: String,
      required: false,
    },
    from: { type: Date, required: false },
    to: { type: Date, required: false },
    refer: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    minage: {
      type: Number,
      required: false,
    },
    maxage: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema, "report");
module.exports = Report;
