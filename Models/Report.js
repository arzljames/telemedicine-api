const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: false,
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
    age: {
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
