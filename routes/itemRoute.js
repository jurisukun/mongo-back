const express = require("express");
const router = express.Router();
const { itemModel } = require("../models/itemModel.js");
const { getItems, addItem } = require("../controllers/itemController.js");

router.get("/", getItems);
router.post("/addItem", addItem);

module.exports = router;
