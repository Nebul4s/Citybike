const express = require("express");
const journeyController = require("../controller/journeyController");

const router = express.Router();

router.route("/getAll").get(journeyController.getAllJourneys);

module.exports = router;
