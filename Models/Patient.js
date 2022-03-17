const mongoose = require("mongoose");
const User = require("../Models/User");

const PatientSchema = new mongoose.Schema({
  firstname: { type: String, required: true },

  middlename: {
    type: String,
    required: String,
  },
  lastname: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  civilStatus: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  birthplace: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  ethnicity: {
    type: String,
    required: true,
  },
  guardian: {
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
  },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Patient = mongoose.model("Patient", PatientSchema, "patient");
module.exports = Patient;
