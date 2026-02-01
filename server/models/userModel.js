const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      sparse: true, // Allows null values for manual login users
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    loginMethod: {
      type: String,
      enum: ["manual", "google"],
      required: true,
    },
    assessmentComplete: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: null,
    },
    preferences: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);