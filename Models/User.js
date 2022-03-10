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
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  designation: {
    type: String,
  },
  specialization: {
    type: String,
  },
  picture: {
    type: String,
  },

  patient: [
    {
      firstname: { type: String, required: true },

      middlename: {
        type: String,
        required: String,
      },
      lastname: {
        type: String,
        required: true,
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
    },
  ],
});

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;
