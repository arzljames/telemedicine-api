const mongoose = require("mongoose");
const User = require("../Models/User");

const FacilitiesSchema = new mongoose.Schema({
 facility: {
   type: String,
 },

 specialization: [{
    expertise: String,
    description: String,
 }],


 address: {
   street: String,
   city: String,
   postal: Number,
   state: String,
 }
});

const Facilities = mongoose.model("Facilities", FacilitiesSchema, "facilities");
module.exports = Facilities;
