const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },

  password: {
    required: true,
    type: String,
  },

  userType: {
    required: true,
    type: String,
  },

  activeStatus: {
    type: String,
  },
  verified: {
    default: false,
    type: Boolean,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  designation: {
    type: String,
  },
  specialization: {
    type: String,
  },
  picture: {
    type: String
  },

  patient: [{
    firstname: String,
    middlename: String,
    lastname: String,
    contact: Number,
    sex: String,
    birthday: String,
    civilStatus: String,
    religion: String,
    birthplace: String,
    address: {
      street: String,
      barangay: String,
      city: String,
    },
    ethnicity: String,
    guardian: {
      name: String,
      relationship: String
    }

  }]
});

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;
