const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const isDuplicate = async (data) => {
  const dup = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });
  if (dup) {
    return true;
  }
  return false;
};

const getUsers = async (req, res) => {
  if (!req?.user?.isAdmin) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error finding users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      res.status(200).json({ user });
      return;
    }
    res.status(401).json({ message: "No user found" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error finding users", error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ user });
      return;
    }
    res.status(401).json({ message: "No user found" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error finding users", error: error.message });
  }
};

const createUser = async (req, res) => {
  if (await isDuplicate(req.body)) {
    res.status(400).json({ message: "Email or username already exists" });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
      eroor: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
};
