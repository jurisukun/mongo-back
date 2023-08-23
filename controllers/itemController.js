const itemModel = require("../models/itemModel");

const getItems = async (req, res) => {
  try {
    const items = await itemModel.find({ user: req.userId });
    res.status(200).json({ message: "Items found", items });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error finding items", error: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const add = await itemModel.create({ ...req.body, user: req.userId });
    if (add) {
      res.status(200).json({ message: "Item added", add });
      return;
    }
    res.status(400).json({ message: "Error adding item" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding item", error: error.message });
  }
};

module.exports = { getItems, addItem };
