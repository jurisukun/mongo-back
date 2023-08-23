const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/getByEmail", getUserByEmail);
router.get("/getById", getUserById);

router.post("/create", createUser);
router.delete("/deleteById", deleteUser);
module.exports = router;
