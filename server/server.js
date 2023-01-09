const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const Journey = require("./model/JourneySchema");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose.set("strictQuery", false);
mongoose.connect(DB, () => {
  console.log("DB connection success");
});

app.get("/dev", async (req, res) => {
  try {
    const query = await Journey.find({ DurationSec: { $lt: 12 } });
    res.send({
      status: 200,
      data: query,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
