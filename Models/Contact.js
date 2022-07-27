const mongoose = require("mongoose");


const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    Message: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema, "contact");
module.exports = Contact;
