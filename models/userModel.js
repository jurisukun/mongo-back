const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
