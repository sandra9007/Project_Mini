const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  gender: String,
  birthDate: Date,
  country: String,
  state: String,
  district: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
