const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  blood_group: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Child", childSchema);
