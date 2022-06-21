const mongoose = require("mongoose");
const User = require("./User");

const SpecializationSchema = new mongoose.Schema(
  {
    specialization: String,
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    }]
  },

  { timestamps: true }
);

const Specialization = mongoose.model(
  "Specialization",
  SpecializationSchema,
  "Specialization"
);
module.exports = Specialization;
