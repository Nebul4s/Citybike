const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const journeyRouter = require("./routes/journeyRoutes");
const locationRouter = require("./routes/locationRoutes");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose.set("strictQuery", false);
mongoose.connect(DB, () => {
  console.log("DB connection success");
});

//Other Middleware
app.use(cors());
app.use(express.json());

//Routers
app.use("/journeys", journeyRouter);
app.use("/locations", locationRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
