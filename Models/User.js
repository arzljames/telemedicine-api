const mongoose = require("mongoose");

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

    fullname: String,

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
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;
