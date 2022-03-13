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

  case: [
    {
      dateCreated: {
        type: Date,
        default: Date.now
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
        required: true
      },
      hospital: {
        type: String,
        required: true
      },
      temperature: {
        type: String,
        required: true
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
    },
  ],
});

const Patient = mongoose.model("Patient", PatientSchema, "patient");
module.exports = Patient;
