const mongoose = require("mongoose");
const User = require("../Models/User");
const Patient = require("../Models/Patient");

const CaseSchema = new mongoose.Schema({
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
  referralPhysician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
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
  paraclinical: String,
  wi: String,
  imd: String,
  reason: String,

});

const Case = mongoose.model("Case", CaseSchema, "case");
module.exports = Case;
