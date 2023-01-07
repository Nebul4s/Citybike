const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, () => {
  console.log("Database connection succesful");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
