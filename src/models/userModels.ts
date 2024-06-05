

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  userName: {
    type: String,
    required: [true, "userName is required"],
    unique:true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
    required: [true, "Please enter your security question"],
  },
  securityQuestionAnswer: {
    type: String,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
});

const User = mongoose.models['Users'] || mongoose.model("Users", userSchema);


export default User;
