const mongoose = require("mongoose");
const User = require("../Models/User");

const PatientSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },

    middlename: {
      type: String,
      required: String,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
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

    dialect: {
      type: String,
      required: true,
      default: "Not specified"
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
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema, "patient");
module.exports = Patient;
