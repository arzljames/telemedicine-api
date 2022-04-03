const mongoose = require("mongoose");
const User = require("../Models/User");

const FacilitiesSchema = new mongoose.Schema({
 facility: {
   type: String,
   required: true,
 },

 specialization: [{
   name: String,
 }],

 address: {
   street: String,
   city: String,
   barangay: String,
 },
 
 user: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: User
 }]
});

const Facilities = mongoose.model("Facilities", FacilitiesSchema, "facilities");
module.exports = Facilities;
