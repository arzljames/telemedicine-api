const mongoose = require("mongoose");

const FacilitiesSchema = new mongoose.Schema({
  facility: {
    type: String,
    required: true,
  },

  address: {
    street: String,
    city: String,
    barangay: String,
  },

  picture: String,
});

const Facilities = mongoose.model("Facilities", FacilitiesSchema, "facilities");
module.exports = Facilities;
