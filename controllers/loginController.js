const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req.query);

  try {
    const user = await User.findOne({ username: req.query.username });

    if (!user) {
      res.status(401).json({ message: "No user found", status: 401 });
      return;
    }
    bcrypt.compare(req.query.password, user.password).then((match) => {
      if (match) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });

        const toreturn = {};
        if (user.isAdmin) {
          toreturn.isAdmin = true;
        }
        toreturn.token = token;
        //set token in header
        res.setHeader("Authorization", token);
        res.status(200).json(toreturn);
        // res.status(200).json(toreturn);
        return;
      }
      res.status(401).json({ message: "Invalid password" });
      return;
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error finding users", error.message);
  }
};

module.exports = { login };
