const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // country: {
    //   type: String,
    //   required: true,
    // },
    // img: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Register = new mongoose.model("Register", UserSchema)

module.exports = Register;