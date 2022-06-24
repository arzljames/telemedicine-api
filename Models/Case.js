const mongoose = require("mongoose");
const User = require("../Models/User");
const Patient = require("../Models/Patient");
const Facilities = require("./Facilities");

const CaseSchema = new mongoose.Schema({
  caseId: {
    type: String,
  },

  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Facilities,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },

  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },

  specialization: {
    type: Array,
    default: [],
  },
  temperature: {
    type: String,
    required: true,
  },
  respiratory: String,
  heart: String,
  blood: String,
  oxygen: String,
  weight: String,
  height: String,
  cc: String,
  hpi: String,
  pmh: String,
  ros: String,
  pe: String,
  paraclinical: { name: String, file: String },
  wi: String,
  imd: String,
  reason: String,
});

const Case = mongoose.model("Case", CaseSchema, "case");
module.exports = Case;
