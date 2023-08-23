const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const itemRoutes = require("./routes/itemRoute");
const loginRoute = require("./routes/loginRoute");
const { errorHandler } = require("./middleware/errorHandler");
const { validateToken } = require("./middleware/validateToken");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(errorHandler);

app.use("/auth", loginRoute);
app.use("/users", validateToken, userRoutes);
app.use("/items", validateToken, itemRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mongo_trial").then(() => {
  console.log("Connected!");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
