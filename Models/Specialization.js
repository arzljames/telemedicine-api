const mongoose = require("mongoose");
const User = require("./User");

const SpecializationSchema = new mongoose.Schema(
  {
    specialization: String,
    description: String,
  },

  { timestamps: true }
);

const Specialization = mongoose.model(
  "Specialization",
  SpecializationSchema,
  "Specialization"
);
module.exports = Specialization;
