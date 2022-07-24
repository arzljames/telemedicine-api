const mongoose = require("mongoose");
const Specialization = require("./Specialization");
const Facilities = require("./Facilities");

const UserSchema = new mongoose.Schema(
  {
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
      default: "Offline",
    },
    verified: {
      default: false,
      type: Boolean,
    },
    firstname: {
      required: true,
      type: String,
      trim: true,
    },
    lastname: {
      required: true,
      type: String,
      trim: true,
    },

    middlename: {
      type: String,
      required: false,
      trim: true,
    },

    fullname: String,

    email: {
      type: String,
      unique: true,
      required: false,
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Facilities,
    },

    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Specialization,
    },

    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;
