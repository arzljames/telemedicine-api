const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    
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
    required: true,
    type: String,
    trim: true
  },
  lastname: {
    required: true,
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },



});

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;
