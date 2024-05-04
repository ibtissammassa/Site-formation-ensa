import mongoose from "mongoose";
import { boolean } from "zod";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  phoneNumber: {
    type: String,
  },
  cin: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  Image: {
    type: String,
  },
  year: {
    type: Number,
    required: function () {
      return this.role === "verified student"; // Required if role is verified student
    },
    enum: [1, 2],
  },
  semester: {
    type: Number,
    required: function () {
      return this.role === "verified student"; // Required if role is verified student
    },
    enum: [1, 2, 3, 4],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
