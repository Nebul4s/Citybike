const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose.set("strictQuery", false);
mongoose.connect(DB, () => {
  console.log("DB connection success");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
